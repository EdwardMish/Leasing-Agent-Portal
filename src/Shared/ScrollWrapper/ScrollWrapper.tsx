import * as React from 'react';

const styles = require('./scroll-wrapper.module.css');

interface ScrollWrapperProps {
    maxHeight: number | string;
    style?: React.CSSProperties;
}

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children, maxHeight, style = {} }) => (
    <div
        className={styles.ScrollWrapper}
        style={{
            ...style,
            maxHeight,
        }}
    >
        {children}
    </div>
);
