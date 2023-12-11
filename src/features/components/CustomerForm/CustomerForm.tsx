import React, { useState } from "react";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}
const InputField = ({ label, type, name, placeholder }: InputFieldProps) => {
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
      />
    </div>
  );
};

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const RadioButton = ({ label, name, value, onChange }: RadioButtonProps) => {
  return (
    <label className={clsx("inline-flex", "items-center", "mt-[8px]")}>
      <input
        type="radio"
        className={clsx("form-radio", "w-[20px]", "h-[20px]", "text-gray")}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={clsx("ml-[8px]")}>{label}</span>
    </label>
  );
};

export type CustomerFormProps = {} & BaseProps;

export const CustomerForm = ({}: CustomerFormProps) => {
  const [isBillingDiff, setIsBillingDiff] = useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBillingDiff(e.target.value === "different");
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
        />
        <InputField
          label="都道府県"
          type="text"
          name="prefecture"
          placeholder="都道府県"
        />
        <InputField
          label="市区町村"
          type="text"
          name="city"
          placeholder="市区町村"
        />
        <InputField
          label="住所"
          type="text"
          name="address"
          placeholder="住所"
        />
        <InputField
          label="建物名・部屋番号"
          type="text"
          name="building"
          placeholder="建物名・部屋番号など"
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
        <InputField label="名前" type="text" name="name" placeholder="名前" />
        <InputField
          label="メールアドレス"
          type="email"
          name="email"
          placeholder="メールアドレス"
        />
        <InputField
          label="電話番号"
          type="tel"
          name="phone"
          placeholder="電話番号"
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
        />
        <br />
        <RadioButton
          label="他の請求書先住所を入力"
          name="billingAddress"
          value="different"
          onChange={handleRadioChange}
        />
        {isBillingDiff && (
          <div className={clsx("mt-[16px]")}>
            <InputField
              label="郵便番号"
              type="text"
              name="billingPostcode"
              placeholder="郵便番号"
            />
            <InputField
              label="都道府県"
              type="text"
              name="billingPrefecture"
              placeholder="都道府県"
            />
            <InputField
              label="市区町村"
              type="text"
              name="billingCity"
              placeholder="市区町村"
            />
            <InputField
              label="住所"
              type="text"
              name="billingAddress"
              placeholder="住所"
            />
            <InputField
              label="建物名・部屋番号"
              type="text"
              name="billingBuilding"
              placeholder="建物名・部屋番号など"
            />
          </div>
        )}
        <button
          type="submit"
          className={clsx(
            "w-full",
            "mt-[32px]",
            "px-[64px]",
            "py-[16px]",
            "text-white",
            "bg-black",
            "rounded-[100px]"
          )}
        >
          注文を確定する
        </button>
      </form>
    </div>
  );
};
