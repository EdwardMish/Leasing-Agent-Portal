import * as React from 'react';
import { IconColors } from '.';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

interface Properties {
    aspect: string;
    color: IconColors;
    style?: React.CSSProperties;
}

export const Add: React.FC<IconProps> = ({ aspect, color, style }: Properties) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </SVGWrapper>
);
