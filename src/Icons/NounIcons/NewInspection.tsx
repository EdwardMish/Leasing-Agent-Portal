import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounNewInspection: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <path d="M64,59.54a33.33,33.33,0,1,0-3.94,4Z" />
    <path d="M59.68,71.58,80.5,92.43A8.44,8.44,0,0,0,92.43,80.5L71.58,59.66Z" />
    <path d="M61.08,46.27l.61-2.76a23.89,23.89,0,0,0-6.44-22.07l-2-2" />
    <line x1="61.76" y1="61.76" x2="65.62" y2="65.62" />
  </SVGWrapper>
);
