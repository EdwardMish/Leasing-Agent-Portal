import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ClosedLock: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" style={{ fill: 'currentColor' }} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SVGWrapper>
);
