import Input, { InputProps } from ".";

export interface LabelInputProps extends InputProps {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export default function LabelInput({ label, isValid, labelProps, ...props }: LabelInputProps) {
  const { className, ...restLabelProps } = labelProps || {};

  return (
    <label className={`block font-semibold ${className}`} {...restLabelProps}>
      {label}
      <Input isValid={isValid} {...props} />
    </label>
  );
}
