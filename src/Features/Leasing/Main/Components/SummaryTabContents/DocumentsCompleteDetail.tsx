import * as React from 'react';

import KeyText from 'Shared/PageElements/KeyText';
import ValueText from 'Shared/PageElements/ValueText';
import { FlexWrapper } from 'Shared/FlexWrapper';

import styles from './summaryContent.module.css';
import { AuthenticatedLink } from 'Shared/Documents/AuthenticatedLink';
import { Document } from 'API/Leasing/Types';
import { UrlFile } from 'API/Leasing/Types/Asset';

const DocumentsCompleteDetail = ({ name, documents }: Document) => {
    return (
        <>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText={'Custom Document'} />
            </FlexWrapper>
            <div className={styles.flexWrapper}>
                <FlexWrapper justify="between" align="start" wrap>
                    <div className={styles.SubHeaderKeyValue}>
                        <KeyText keyText={'Upload Title'} />
                        <ValueText valueText={name || ''} small />
                    </div>

                    <div className={styles.SubHeaderKeyValue}>
                        <KeyText keyText={'Uploads'} />
                        {documents.map((doc: UrlFile, i) => (
                            <div className={styles.uploadClick} key={`${doc.name}-${i}`}>
                                <AuthenticatedLink url={doc.url} filename={doc.name}>
                                    <ValueText valueText={doc.name} small style={{ wordWrap: 'break-word' }} />
                                </AuthenticatedLink>
                            </div>
                        ))}
                    </div>
                </FlexWrapper>
            </div>
        </>
    );
};

export default DocumentsCompleteDetail;

