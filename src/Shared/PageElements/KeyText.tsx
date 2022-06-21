import * as React from 'react';

import styles from './key-value-text.module.css';

interface KeyProps {
    keyText?: string;
    colon?: boolean;
    row?: boolean;
    right?: boolean;
}

const KeyText: React.FC<KeyProps> = ({ keyText, colon = true, row = false, right = false }) => {
    return (
        <div className={row ? styles.ColumnWrapperRow : right ? styles.Right : styles.ColumnWrapper}>
            <p className={styles.keyTextStyle}>{colon ? `${keyText}:` : keyText}</p>
        </div>
    );
};

export default KeyText;

