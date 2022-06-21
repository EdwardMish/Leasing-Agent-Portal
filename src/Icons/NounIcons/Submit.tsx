import * as React from "react";

import { IconProps } from "../IconProps";
import { SVGWrapper } from "../SVGWrapper";

export const NounIconSubmit: React.FC<IconProps> = ({
  aspect,
  color,
  style = {},
}) => (
  <SVGWrapper aspect={aspect} color={color} style={style} viewBox="0 0 100 100">
    <path d="M40.2,12.88H18.08a1.5,1.5,0,0,0-.3,0,2.89,2.89,0,0,0-2.59,2.55S9.39,64.5,9.39,64.56v28a2.89,2.89,0,0,0,2.89,2.89H87.7a2.9,2.9,0,0,0,2.91-2.89V64.6c0-.08-5.82-49.17-5.82-49.17a2.9,2.9,0,0,0-2.89-2.55H59.78" />
    <polygon points="44.67 4.57 55.34 4.57 57.34 41.44 70.01 41.44 49.99 67.53 29.99 41.44 42.67 41.44 44.67 4.57" />
    <path d="M9.39,64.56l23.13.23c1.91,8.35,8.55,15,17.47,15s15.59-6.63,17.5-15l23.12-.19" />
  </SVGWrapper>
);
