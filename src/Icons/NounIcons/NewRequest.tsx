import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounNewRequest: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <polyline points="89.5 52.61 89.5 34.68 7.55 34.68 7.55 88.46 51.08 88.46" />
    <polyline points="89.5 28.33 89.5 18.09 45.96 18.09 45.96 7.84 15.23 7.84 15.23 18.09 7.55 18.09 7.55 28.33" />
    <path d="M74.13,54A19.14,19.14,0,1,0,93.26,73.09,19.14,19.14,0,0,0,74.13,54Z" />
    <line x1="74.13" y1="65.41" x2="74.13" y2="80.78" />
    <line x1="66.45" y1="73.09" x2="81.82" y2="73.09" />
  </SVGWrapper>
);
