import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ChevronDown: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <polyline points="6 9 12 15 18 9" />
    </SVGWrapper>
);
