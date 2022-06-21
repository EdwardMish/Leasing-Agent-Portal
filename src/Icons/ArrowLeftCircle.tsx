import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ArrowLeftCircle: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 8 8 12 12 16" />
        <line x1="16" y1="12" x2="8" y2="12" />
    </SVGWrapper>
);
