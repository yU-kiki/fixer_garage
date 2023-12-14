import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { customerInfoState } from "@/stores/customerState";
import { ConfirmOrderButton } from "@/features/components/Order/ConfirmOrderButton/ConfirmOrderButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

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
    <div className={clsx("mb-[16px]")}>
      <label
        htmlFor={name}
        className={clsx("block", "mb-[4px]", "font-[600]", "text-[14px]")}
      >
        {label}
      </label>
      <input
        className={clsx(
          "w-full",
          "px-[16px]",
          "py-[8px]",
          "border",
          "border-light-gray",
          "rounded-[8px]",
          "text-[14px]",
          "md:text-[16px]"
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
    <label className={clsx("inline-flex", "items-center", "mt-[8px]")}>
      <input
        type="radio"
        className={clsx("form-radio", "w-[20px]", "h-[20px]", "text-gray")}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={clsx("ml-[8px]")}>{label}</span>
    </label>
  );
};

export type CustomerFormProps = {} & BaseProps;

export const CustomerForm = ({}: CustomerFormProps) => {
  const [customerInfo, setCustomerInfo] = useRecoilState(customerInfoState);
  const [isBillingDiff, setIsBillingDiff] = useState(false);

  useEffect(() => {
    setCustomerInfo((info) => ({ ...info, isBillingDiff }));
  }, [isBillingDiff, setCustomerInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBillingDiff(e.target.value === "different");
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(customerInfo);
  };

  return (
    <div
      className={clsx("md:w-[576px]", "mt-[16px]", "px-[16px]", "md:px-[32px]")}
    >
      <form>
        <p
          className={clsx(
            "mb-[16px]",
            "font-[600]",
            "text-[18px]",
            "md:text-[20px]"
          )}
        >
          配達先
        </p>
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
            "mt-[32px]",
            "mb-[16px]",
            "font-[600]",
            "text-[18px]",
            "md:text-[20px]"
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
            "mt-[32px]",
            "mb-[8px]",
            "font-[600]",
            "text-[18px]",
            "md:text-[20px]"
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
          <div className={clsx("mt-[16px]")}>
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
        <ConfirmOrderButton onClick={handleSubmit} />
      </form>
    </div>
  );
};
