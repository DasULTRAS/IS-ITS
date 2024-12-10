import katex from "katex";
import React from "react";

export interface KatexProps {
  texString: string;
  options?: KatexOptions;
}

export interface KatexOptions {
  displayMode?: boolean;
  output?: "html" | "mathml" | "htmlAndMathml";
  leqno?: boolean;
  fleqn?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: object;
  minRuleThickness?: number;
  colorIsTextColor?: boolean;
  maxSize?: number;
  maxExpand?: number;
  strict?: boolean;
  trust?: boolean;
  globalGroup?: boolean;
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
