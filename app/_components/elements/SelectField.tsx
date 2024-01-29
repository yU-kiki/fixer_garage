import clsx from 'clsx';
import React, { forwardRef } from 'react';

export type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, name, options, value, isRequired, errorMessage, onChange },
    ref,
  ) => {
    return (
      <div className={clsx('mb-[16px]')}>
        <label htmlFor={name} className={clsx('flex', 'items-center')}>
          <p className={clsx('font-[600]', 'text-[14px]')}>{label}</p>
          {isRequired && (
            <span
              className={clsx(
                'ml-[8px]',
                'px-[8px]',
                'py-[4px]',
                'rounded-[4px]',
                'leading-[1]',
                'text-[10px]',
                { 'bg-red text-white': isRequired, 'bg-white3': !isRequired },
              )}
            >
              必須
            </span>
          )}
        </label>
        <select
          className={clsx(
            'w-full',
            'mt-[8px]',
            'px-[16px]',
            'py-[8px]',
            'border',
            errorMessage ? 'border-red' : 'border-light-gray',
            'rounded-[8px]',
            'text-[14px]',
            'md:text-[16px]',
          )}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          ref={ref}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p className={clsx('mt-[8px]', 'text-[14px]', 'text-red')}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
