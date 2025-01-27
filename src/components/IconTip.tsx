import { Info, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Tooltip } from "react-tooltip";

export interface TipProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tooltipText: string;
  id: string;
  iconProps?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export default function IconTip({ tooltipText, iconProps, ...props }: TipProps) {
  return (
    <div {...props}>
      <Info
        size={22}
        className={`cursor-pointer fill-white/60 text-white/90 hover:text-gray-700 dark:fill-black/60`}
        data-tooltip-id={`tooltip-${props.id}`}
        {...iconProps}
      />
      <Tooltip id={`tooltip-${props.id}`} place="top">
        {tooltipText}
      </Tooltip>
    </div>
  );
}
