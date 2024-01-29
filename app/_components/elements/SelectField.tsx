import clsx from 'clsx';
import Select, { SingleValue } from 'react-select';

export type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export const SelectField = ({
  label,
  name,
  options,
  value,
  isRequired,
  errorMessage,
  onChange,
}: SelectFieldProps) => {
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>,
  ) => {
    onChange(selectedOption ? selectedOption.value : '');
  };

  const selectedValue = options.find((option) => option.value === value);

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
      <Select
        options={options}
        classNamePrefix="react-select"
        value={selectedValue}
        onChange={handleChange}
        styles={{
          control: (provided) => ({
            ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '39px',
            marginTop: '8px',
            padding: '0 8px',
            border: '1px solid ' + (errorMessage ? 'red' : 'lightgray'),
            borderRadius: '8px',
            fontSize: '14px',
            '&:hover': {
              borderColor: 'darkgray',
            },
            '@media (min-width: 768px)': {
              height: '42px',
              fontSize: '16px',
            },
          }),
          option: (provided, { isDisabled }) => ({
            ...provided,
            backgroundColor: 'white',
            color: isDisabled ? 'lightgray' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
            '&:hover': {
              backgroundColor: '#efefef',
            },
          }),
          indicatorSeparator: () => ({ display: 'none' }),
        }}
      />
      {errorMessage && (
        <p className={clsx('mt-[8px]', 'text-[14px]', 'text-red')}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
