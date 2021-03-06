import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ArrowRightCircle: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 16 16 12 12 8" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </SVGWrapper>
);
