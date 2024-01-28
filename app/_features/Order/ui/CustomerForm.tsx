import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Core as YubinBangoCore } from 'yubinbango-core2';

import { InputField } from '@/_components/elements/InputField';
import { LoadingSpinner } from '@/_components/elements/LoadingSpinner';
import { NavigateButton } from '@/_components/elements/NavigateButton';
import { RadioButton } from '@/_components/elements/RadioButton';
import { orderConfirmation } from '@/_services/emailTemplates/orderConfirmation';
import { sendEmailWithSendGrid } from '@/_services/sendgridServices';
import { sendToSlackPurchaseRecord } from '@/_services/slackServices';
import { saveToSpreadSheetPurchaseRecord } from '@/_services/spreadSheetServices';
import { AddressType } from '@/_stores/addressState';
import {
  CombinedPurchaseType,
  orderProductState,
  orderCustomerState,
  getDefaultOrderProduct,
  getDefaultOrderCustomer,
} from '@/_stores/orderState';
import { customerFormValidation } from '@/_validations/customerFormValidation';

export const CustomerForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderProduct, setOrderProduct] = useRecoilState(orderProductState);
  const [orderCustomer, setOrderCustomer] = useRecoilState(orderCustomerState);
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [isBillingDiff, setIsBillingDiff] = useState(false);
  const [customerFormErrors, setCustomerFormErrors] = useState<{
    [key: string]: string;
  }>({});
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOrderCustomer((info) => ({ ...info, isBillingDiff }));
  }, [isBillingDiff, setOrderCustomer]);

  const handleAddressAutoFill = (postcode: string) => {
    new YubinBangoCore(postcode, (address: AddressType) => {
      setOrderCustomer((prev) => ({
        ...prev,
        prefecture: address.region || prev.prefecture,
        city: address.locality || prev.city,
        address: address.street || prev.address,
      }));

      if (addressRef.current) {
        addressRef.current.focus();
      }
    });
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderCustomer({ ...orderCustomer, [name]: value });

    if (value.length === 7) {
      handleAddressAutoFill(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderCustomer({ ...orderCustomer, [name]: value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBillingDiff(e.target.value === 'different');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { isValid, errors } = customerFormValidation(orderCustomer);

    if (!isValid) {
      setCustomerFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const getCurrentTimeInJST = () => {
        const now = new Date();
        return now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      };
      const currentTime = getCurrentTimeInJST();

      const combinedPurchaseData: CombinedPurchaseType = {
        time: currentTime,
        ...orderProduct,
        ...orderCustomer,
      };

      // スプレッドシートへの保存
      const saveResult =
        await saveToSpreadSheetPurchaseRecord(combinedPurchaseData);
      if (saveResult.status !== 200) throw new Error(saveResult.message);
      // console.log(saveResult.message);

      // Slackへの通知
      const slackResult = await sendToSlackPurchaseRecord(combinedPurchaseData);
      if (slackResult.status !== 200) throw new Error(slackResult.message);
      // console.log(slackResult.message);

      // メールの送信
      const emailBody = orderConfirmation(combinedPurchaseData);
      const emailResult = await sendEmailWithSendGrid(
        orderCustomer.email,
        '【FIXER GARAGE】ご注文ありがとうございました。',
        emailBody,
      );
      if (emailResult.status !== 200) throw new Error(emailResult.message);
      // console.log(emailResult.message);

      // ローカルストレージのクリーンアップとステートのリセット
      localStorage.removeItem('orderProduct');
      setOrderProduct(getDefaultOrderProduct());
      setOrderCustomer(getDefaultOrderCustomer());

      setLoading(false);
      router.push('/thanks');
    } catch (error) {
      alert(
        '注文情報の送信に失敗しました。\nお手数ですが、もう一度お試しください。',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={clsx('mt-[16px]')}>
          <form>
            <p
              className={clsx(
                'mb-[16px]',
                'font-[600]',
                'text-[18px]',
                'md:text-[20px]',
              )}
            >
              配達先
            </p>
            <div className={clsx('mb-[24px]')}>
              <label className={clsx('block', 'font-[600]', 'text-[14px]')}>
                国名
              </label>
              <div className={clsx('flex', 'gap-x-[16px]')}>
                <RadioButton
                  label="日本 (Japan)"
                  name="country"
                  value="Japan"
                  onChange={handleCountryChange}
                  checked={selectedCountry === 'Japan'}
                />
                <RadioButton
                  label="その他 (Other)"
                  name="country"
                  value="Other"
                  onChange={handleCountryChange}
                  checked={selectedCountry === 'Other'}
                />
              </div>
              {selectedCountry === 'Other' && (
                <div className={clsx('my-[16px]', 'text-[14px]', 'text-red')}>
                  <p>
                    We are retailing only within Japanese market. <br />
                    Orders from overseas are not accepted.
                  </p>
                </div>
              )}
            </div>
            <InputField
              label="郵便番号"
              type="number"
              name="postcode"
              placeholder="郵便番号"
              isRequired={true}
              errorMessage={customerFormErrors.postcode}
              onChange={handlePostcodeChange}
            />
            <InputField
              label="都道府県"
              type="text"
              name="prefecture"
              placeholder="都道府県"
              value={orderCustomer.prefecture}
              isRequired={true}
              errorMessage={customerFormErrors.prefecture}
              onChange={handleInputChange}
            />
            <InputField
              label="市区町村"
              type="text"
              name="city"
              placeholder="市区町村"
              value={orderCustomer.city}
              isRequired={true}
              errorMessage={customerFormErrors.city}
              onChange={handleInputChange}
            />
            <InputField
              label="住所"
              type="text"
              name="address"
              placeholder="住所"
              value={orderCustomer.address}
              isRequired={true}
              errorMessage={customerFormErrors.address}
              autoFocus={true}
              ref={addressRef}
              onChange={handleInputChange}
            />
            <InputField
              label="建物名・部屋番号"
              type="text"
              name="buildingAddress"
              placeholder="建物名・部屋番号など"
              isRequired={false}
              onChange={handleInputChange}
            />

            <p
              className={clsx(
                'mt-[32px]',
                'mb-[16px]',
                'font-[600]',
                'text-[18px]',
                'md:text-[20px]',
              )}
            >
              お客様情報
            </p>
            <InputField
              label="名前"
              type="text"
              name="name"
              placeholder="名前"
              isRequired={true}
              errorMessage={customerFormErrors.name}
              onChange={handleInputChange}
            />
            <InputField
              label="メールアドレス"
              type="email"
              name="email"
              placeholder="メールアドレス"
              isRequired={true}
              errorMessage={customerFormErrors.email}
              onChange={handleInputChange}
            />
            <InputField
              label="電話番号"
              type="tel"
              name="phone"
              placeholder="電話番号"
              isRequired={true}
              errorMessage={customerFormErrors.phone}
              onChange={handleInputChange}
            />

            <p
              className={clsx(
                'mt-[32px]',
                'mb-[8px]',
                'font-[600]',
                'text-[18px]',
                'md:text-[20px]',
              )}
            >
              請求先住所
            </p>
            <RadioButton
              label="配送先の住所と同じ"
              name="billingAddress"
              value="same"
              onChange={handleRadioChange}
              checked={!isBillingDiff}
            />
            <br />
            <RadioButton
              label="他の請求書先住所を入力"
              name="billingAddress"
              value="different"
              onChange={handleRadioChange}
              checked={isBillingDiff}
            />
            {isBillingDiff && (
              <div className={clsx('mt-[16px]')}>
                <InputField
                  label="郵便番号"
                  type="text"
                  name="billingPostcode"
                  placeholder="郵便番号"
                  errorMessage={customerFormErrors.billingPostcode}
                  onChange={handleInputChange}
                />
                <InputField
                  label="都道府県"
                  type="text"
                  name="billingPrefecture"
                  placeholder="都道府県"
                  errorMessage={customerFormErrors.billingPrefecture}
                  onChange={handleInputChange}
                />
                <InputField
                  label="市区町村"
                  type="text"
                  name="billingCity"
                  placeholder="市区町村"
                  errorMessage={customerFormErrors.billingCity}
                  onChange={handleInputChange}
                />
                <InputField
                  label="住所"
                  type="text"
                  name="billingAddress"
                  placeholder="住所"
                  errorMessage={customerFormErrors.billingAddress}
                  onChange={handleInputChange}
                />
                <InputField
                  label="建物名・部屋番号"
                  type="text"
                  name="billingBuildingAddress"
                  placeholder="建物名・部屋番号など"
                  onChange={handleInputChange}
                />
              </div>
            )}
            <NavigateButton text="注文情報を送信する" onClick={handleSubmit} />
          </form>
        </div>
      )}
    </>
  );
};
