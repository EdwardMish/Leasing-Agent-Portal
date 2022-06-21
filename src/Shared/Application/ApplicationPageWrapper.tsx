import React from 'react';

import styles from './application-page-wrapper.module.css';

interface Properties {
    children: React.ReactElement;
}

function ApplicationPageWrapper({ children }: Properties): React.ReactElement {
    return <div className={styles.ApplicationPageWrapper}>{children}</div>;
}

export default ApplicationPageWrapper;
