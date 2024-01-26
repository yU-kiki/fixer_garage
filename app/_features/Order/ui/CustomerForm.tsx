import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { LoadingSpinner } from '@/_components/elements/LoadingSpinner';
import { NavigateButton } from '@/_components/elements/NavigateButton';
import { orderConfirmation } from '@/_services/emailTemplates/orderConfirmation';
import { sendEmailWithSendGrid } from '@/_services/sendgridServices';
import { sendToSlackPurchaseRecord } from '@/_services/slackServices';
import { saveToSpreadSheetPurchaseRecord } from '@/_services/spreadSheetServices';
import {
  CombinedPurchaseType,
  orderProductState,
  orderCustomerState,
  getDefaultOrderProduct,
  getDefaultOrderCustomer,
} from '@/_stores/orderState';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const InputField = ({
  label,
  type,
  name,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <div className={clsx('mb-[16px]')}>
      <label
        htmlFor={name}
        className={clsx('block', 'mb-[4px]', 'font-[600]', 'text-[14px]')}
      >
        {label}
      </label>
      <input
        className={clsx(
          'w-full',
          'px-[16px]',
          'py-[8px]',
          'border',
          'border-light-gray',
          'rounded-[8px]',
          'text-[14px]',
          'md:text-[16px]',
        )}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}
const RadioButton = ({
  label,
  name,
  value,
  onChange,
  checked,
}: RadioButtonProps) => {
  return (
    <label className={clsx('inline-flex', 'items-center', 'mt-[8px]')}>
      <input
        type="radio"
        className={clsx('form-radio', 'w-[20px]', 'h-[20px]', 'text-gray')}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={clsx('ml-[8px]')}>{label}</span>
    </label>
  );
};

export const CustomerForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderProduct, setOrderProduct] = useRecoilState(orderProductState);
  const [orderCustomer, setOrderCustomer] = useRecoilState(orderCustomerState);
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [isBillingDiff, setIsBillingDiff] = useState(false);

  useEffect(() => {
    setOrderCustomer((info) => ({ ...info, isBillingDiff }));
  }, [isBillingDiff, setOrderCustomer]);

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
            <div className={clsx('mb-[16px]')}>
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
              type="text"
              name="postcode"
              placeholder="郵便番号"
              onChange={handleInputChange}
            />
            <InputField
              label="都道府県"
              type="text"
              name="prefecture"
              placeholder="都道府県"
              onChange={handleInputChange}
            />
            <InputField
              label="市区町村"
              type="text"
              name="city"
              placeholder="市区町村"
              onChange={handleInputChange}
            />
            <InputField
              label="住所"
              type="text"
              name="address"
              placeholder="住所"
              onChange={handleInputChange}
            />
            <InputField
              label="建物名・部屋番号"
              type="text"
              name="buildingAddress"
              placeholder="建物名・部屋番号など"
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
              onChange={handleInputChange}
            />
            <InputField
              label="メールアドレス"
              type="email"
              name="email"
              placeholder="メールアドレス"
              onChange={handleInputChange}
            />
            <InputField
              label="電話番号"
              type="tel"
              name="phone"
              placeholder="電話番号"
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
                  onChange={handleInputChange}
                />
                <InputField
                  label="都道府県"
                  type="text"
                  name="billingPrefecture"
                  placeholder="都道府県"
                  onChange={handleInputChange}
                />
                <InputField
                  label="市区町村"
                  type="text"
                  name="billingCity"
                  placeholder="市区町村"
                  onChange={handleInputChange}
                />
                <InputField
                  label="住所"
                  type="text"
                  name="billingAddress"
                  placeholder="住所"
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
