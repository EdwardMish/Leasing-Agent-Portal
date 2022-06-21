import * as React from 'react';

const styles = require('./loading-content.module.css');

interface LoadingContentProps {
    message?: string;
    qaDataTag?: string;
    height?: number;
    lowProfile?: boolean;
    withMarginTop?: boolean;
    withMarginBottom?: boolean;
}

export const LoadingContent: React.FC<LoadingContentProps> = ({
    message = 'Loading...',
    qaDataTag = 'loading-content-component',
    lowProfile = false,
    withMarginTop = true,
    withMarginBottom = true,
    height,
}) => (
    <div
        style={{
            height: height ? `${height}rem` : 'auto',
            margin: '0',
            marginTop: withMarginTop ? '1rem' : '0',
            marginBottom: withMarginBottom ? '1rem' : '0',
            padding: lowProfile ? '1rem' : '2rem',
        }}
        className={styles.LoadingContent}
        data-testid={qaDataTag}
    >
        <p>{message}</p>
    </div>
);
