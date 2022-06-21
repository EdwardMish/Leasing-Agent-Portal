import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ArrowUpCircle: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="16 12 12 8 8 12" />
        <line x1="12" y1="16" x2="12" y2="8" />
    </SVGWrapper>
);
