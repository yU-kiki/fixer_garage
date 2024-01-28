import clsx from 'clsx';

export type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputField = ({
  label,
  type,
  name,
  placeholder,
  isRequired,
  errorMessage,
  onChange,
}: InputFieldProps) => {
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
      <input
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
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errorMessage && (
        <p className={clsx('mt-[8px]', 'text-[14px]', 'text-red')}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
