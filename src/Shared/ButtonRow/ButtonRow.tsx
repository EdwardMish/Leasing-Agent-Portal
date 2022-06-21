import * as React from 'react';

const styles = require('./button-row.module.css');

interface ButtonRowProps {
    withMarginTop?: boolean;
    withMarginBottom?: boolean;
    style?: Record<string, string>;
}

export const ButtonRow: React.FC<ButtonRowProps> = ({
    children,
    withMarginTop = false,
    withMarginBottom = false,
    style = {},
}) => (
    <div
        style={{
            marginTop: withMarginTop ? '1rem' : '0',
            marginBottom: withMarginBottom ? '1rem' : '0',
            ...style,
        }}
        className={styles.ButtonRow}
    >
        {children}
    </div>
);

