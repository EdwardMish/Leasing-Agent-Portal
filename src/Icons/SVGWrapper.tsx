import * as React from 'react';

import { IconProps } from './IconProps';

export const SVGWrapper: React.FC<IconProps> = ({
    aspect,
    children,
    color,
    style = {},
    viewBox = "0 0 24 24",
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox={viewBox}
        fill="none"
        stroke={color || 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
