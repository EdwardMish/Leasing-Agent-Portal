import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounIconRoof: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <path d="M4.57,83.4,50,41.24,95.43,83.4" />
    <path d="M68.37,8.48c-2.3,2.81-11.17,14-11.17,22a11.17,11.17,0,1,0,22.33,0C79.53,22.45,70.71,11.29,68.37,8.48Z" />
    <path d="M87.31,4c-1.5,1.88-5.6,7.23-5.6,11.12a5.61,5.61,0,1,0,11.21,0C92.92,11.2,88.82,5.85,87.31,4Z" />
    <line x1="10" y1="78.36" x2="10" y2="96.03" />
    <line x1="90" y1="78.36" x2="90" y2="96.03" />
  </SVGWrapper>
);
