import * as React from 'react';

import { IconProps } from './IconProps';

export const SVGFillWrapper: React.FC<IconProps> = ({
    aspect,
    children,
    color,
    style = {},
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={color || 'currentColor'}
        stroke="none"
        style={{
            color: color || 'currentColor',
            height: aspect?.length ? aspect : 'auto',
            minWidth: '1rem',
            width: aspect?.length ? aspect : 'auto',
            ...style,
        }}
    >
        {children}
    </svg>
);
