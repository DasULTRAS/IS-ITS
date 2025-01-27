import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isValid?: boolean;
  tooltipText?: string;
}

export default function Input({ value, onChange, isValid = true, className, tooltipText, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      <input
        value={value}
        onChange={onChange}
        className={`${className} ${isValid === false && "ring-2 ring-red-500"} `}
        {...props}
      />
      {tooltipText && (
        <>
          <Info
            size={22}
            className="absolute -top-2 -right-2 cursor-pointer fill-white/60 text-white/90 hover:text-gray-700 dark:fill-black/60"
            data-tooltip-id={`tooltip-${props.id}`}
          />
          <Tooltip id={`tooltip-${props.id}`} place="top">
            {tooltipText}
          </Tooltip>
        </>
      )}
    </div>
  );
}
