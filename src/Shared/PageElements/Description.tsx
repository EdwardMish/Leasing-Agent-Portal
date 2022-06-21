import React from 'react';

import styles from './description-module.css';

interface Properties {
    children: React.ReactNode;
    noBottomPadding?: boolean;
}

function Description({ children, noBottomPadding }: Properties) {
    return <div className={noBottomPadding ? `${styles.Description} ${styles.NoPadding}` : styles.Description}>{children}</div>;
}

export default Description;
