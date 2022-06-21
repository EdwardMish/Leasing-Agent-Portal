import * as React from 'react';

import { AlignItemsOptions } from './Types/AlignItemsOptions';
import { JustifyContentOptions } from './Types/JustifyContentOptions';

import justifyContent from './utils/justifyContent';
import alignItems from './utils/alignItems';
interface FlexWrapperProps {
    justify: JustifyContentOptions;
    align: AlignItemsOptions;
    gap?: string;
    className?: string;
    column?: boolean;
    style?: React.CSSProperties;
    wrap?: boolean;
    fullWidth?: boolean;
    handleClick?: () => void;
}

export const FlexWrapper: React.FC<FlexWrapperProps> = ({
    align,
    children,
    className = '',
    column = false,
    justify,
    gap,
    wrap = false,
    fullWidth = false,
    style = {},
    handleClick = () => {},
}) => (
    <div
        style={{
            display: 'flex',
            justifyContent: justifyContent(justify),
            alignItems: alignItems(align),
            flexDirection: column ? 'column' : undefined, // by default, direction is row
            flexWrap: wrap ? 'wrap' : 'nowrap',
            width: fullWidth ? '100%' : 'auto',
            gap: gap ?? '',
            ...style,
        }}
        className={className}
        onClick={handleClick}
    >
        {children}
    </div>
);
