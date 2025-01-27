import katex, { KatexOptions } from "katex";
import React from "react";

export interface KatexProps extends React.HTMLAttributes<HTMLSpanElement> {
  texString: string;
  options?: KatexOptions;
}

export default function Katex({ texString, options = {}, className, ...props }: KatexProps): React.JSX.Element {
  const { output = "mathml", throwOnError = false, ...restOptions } = options;

  return (
    <span
      className={`${className} katex`}
      dangerouslySetInnerHTML={{ __html: katex.renderToString(texString, { output, throwOnError, ...restOptions }) }}
      {...props}
    />
  );
}
