import clsx from 'clsx';

export type RadioButtonProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

export const RadioButton = ({
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
