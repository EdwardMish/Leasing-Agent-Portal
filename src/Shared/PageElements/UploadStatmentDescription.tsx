import React from 'react';

import styles from './uploadStatementDescription.module.css';

interface Properties {
    document: string;
    uploadReason: string;
}

function UploadStatementDescription({ document, uploadReason }: Properties): React.ReactElement {
    return (
        <p className={styles.UploadStatement}>
            Please include a {document} because you selected '{uploadReason}' (required)
        </p>
    );
}

export default UploadStatementDescription;
