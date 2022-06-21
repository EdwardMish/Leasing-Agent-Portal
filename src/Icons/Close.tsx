import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const Close: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </SVGWrapper>
);
