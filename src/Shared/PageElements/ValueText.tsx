import * as React from 'react';

import styles from './key-value-text.module.css';

interface ValueProps {
    valueText?: string | number;
    small?: boolean;
    color?: string;
    style?: React.CSSProperties;
}

const ValueText: React.FC<ValueProps> = ({ valueText, small, color, style }) => {
    return (
        <div className={styles.ColumnWrapper}>
            <p className={small ? styles.valueSmallText : styles.valueTextStyle} style={{ color: color, ...style }}>
                {valueText}
            </p>
        </div>
    );
};

export default ValueText;

