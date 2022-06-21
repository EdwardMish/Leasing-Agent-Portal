import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ChevronDoubleLeft: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
    </SVGWrapper>
);
