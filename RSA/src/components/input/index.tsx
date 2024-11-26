export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isValid?: boolean;
}

export default function Input({ value, onChange, isValid = true, className, ...props }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`${isValid ? "border-gray-300" : "border-2 border-red-500"} ${className}`}
      {...props}
    />
  );
}
