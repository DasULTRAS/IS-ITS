export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isValid?: boolean;
}

export default function Input({ value, onChange, isValid = true, ...props }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`rounded border p-2 ${isValid ? "border-gray-300" : "border-2 border-red-500"}`}
      {...props}
    />
  );
}
