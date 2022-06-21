import React from 'react';

import styles from './uploadStatementDescription.module.css';

interface Properties {
    message: string;
}

function UploadStatementCustomTask({ message }: Properties): React.ReactElement {
    return <p className={styles.UploadStatement}>{message}</p>;
}

export default UploadStatementCustomTask;
