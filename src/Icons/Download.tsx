import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const Download: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </SVGWrapper>
);
