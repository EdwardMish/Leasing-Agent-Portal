import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ArrowDownCircle: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="8 12 12 16 16 12" />
        <line x1="12" y1="8" x2="12" y2="16" />
    </SVGWrapper>
);
