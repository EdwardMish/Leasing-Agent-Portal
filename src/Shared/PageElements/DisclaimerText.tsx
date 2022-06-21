import React from 'react';

import styles from './disclaimer-text.module.css';

interface Properties {
    disclaimerText: string;
    warning?: boolean;
    footerText?: boolean;
    right?: boolean;
    paddingBottom?: boolean;
}

function DisclaimerText({ disclaimerText, warning, footerText, right, paddingBottom }: Properties): React.ReactElement {
    return (
        <div
            className={`${styles.Disclaimer} ${warning ? styles.warning : styles.normal} ${
                footerText ? styles.footer : ''
            } ${right ? styles.right : ''} ${paddingBottom ? styles.PaddingBottom : ''}`}
        >
            {disclaimerText}
        </div>
    );
}

export default DisclaimerText;
