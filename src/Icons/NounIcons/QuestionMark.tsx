import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounQuestionMark: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <path d="M20.59,32.72a28.43,28.43,0,0,1,8-19.36,27.57,27.57,0,0,1,17-8.71c10.63-1.33,19.65,2,26.8,10.07,4.63,5.2,7.15,11.39,7,19.62C79.21,45,73.34,53.72,62.58,59a14.44,14.44,0,0,0-8.52,11.24,38.18,38.18,0,0,0-.13,4.55" />
    <path
      stroke="none"
      fill={color}
      d="M59.59,90.63a5.22,5.22,0,1,1-5.11-5.28A5.34,5.34,0,0,1,59.59,90.63Z"
    />
  </SVGWrapper>
);
