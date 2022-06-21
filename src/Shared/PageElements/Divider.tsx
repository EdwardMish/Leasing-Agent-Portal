import React from 'react';

import styles from './divider.module.css';

interface Properties {
    extraBottomMargin?: boolean;
    equalMargin?: boolean;
}

function Divider({ extraBottomMargin, equalMargin }: Properties): React.ReactElement {
    return <hr className={extraBottomMargin ? `${styles.Divider} ${styles.ExtraMargin}` : equalMargin ? `${styles.Divider} ${styles.EqualMargin}` : styles.Divider} />;
}

export default Divider;
