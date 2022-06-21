import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

export const ChevronDoubleRight: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
    </SVGWrapper>
);
