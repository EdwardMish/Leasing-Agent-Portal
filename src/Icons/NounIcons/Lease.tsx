import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounIconLease: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <path d="M75.73,34.65v-9.3a1.61,1.61,0,0,0-.1-.53,3.08,3.08,0,0,0-.22-.41l-.14-.17L56.07,5A1.57,1.57,0,0,0,55,4.57H9.38A1.55,1.55,0,0,0,7.81,6.13h0V93.87a1.55,1.55,0,0,0,1.57,1.56H74.17a1.57,1.57,0,0,0,1.56-1.56V57.13" />
    <path d="M49.2,61.29a1.55,1.55,0,0,0-.37.58l-5,14a1.57,1.57,0,0,0,2,2l14-5a1.47,1.47,0,0,0,.57-.35L91.89,41A7.91,7.91,0,0,0,80.7,29.79Z" />
    <path d="M53.38,4.57V25.35A1.58,1.58,0,0,0,55,26.91H75.73" />
    <line x1="86.36" y1="46.5" x2="75.18" y2="35.31" />
    <line x1="90.99" y1="41.87" x2="79.81" y2="30.68" />
    <path d="M57,36.56H18.78a.43.43,0,0,0-.16,0" />
    <path d="M48.42,49.37H18.62" />
    <path d="M40.66,62.18h-22" />
    <path d="M36.65,74.47l-5,4.52-5-4.52a1.56,1.56,0,0,0-2.11,0l-6,5.48" />
  </SVGWrapper>
);
