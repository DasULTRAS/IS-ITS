import katex, { KatexOptions } from "katex";
import React from "react";

export interface KatexProps {
  texString: string;
  options?: KatexOptions;
}

export default function Katex({ texString, options = {} }: KatexProps): React.JSX.Element {
  const { output = "mathml", throwOnError = false, ...restOptions } = options;

  return (
    <div
      className="katex"
      dangerouslySetInnerHTML={{ __html: katex.renderToString(texString, { output, throwOnError, ...restOptions }) }}
    />
  );
}
