import * as React from 'react';

import ValueText from '../../Shared/PageElements/ValueText';
import KeyText from '../../Shared/PageElements/KeyText';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { Remove } from '../../Icons/Remove';
import { IconColors } from '../../Icons/IconColors';

import styles from '../Pages/guarantor-profile-overview.module.css';

interface DocumentDetailProps {
    title: string;
    uploads: string[];
    edit?: boolean;
}

const DocumentDetail: React.FC<DocumentDetailProps> = ({ title, uploads, edit = false }) => {
    return (
        <div>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText="Custom Document" />
                {edit ? <Remove aspect={'1.3rem'} color={IconColors.WarningRed} /> : ''}
            </FlexWrapper>
            <FlexWrapper justify="between" align="start" wrap>
                <div className={styles.SubHeaderKeyValue}>
                    <KeyText keyText="Upload Title" />
                    <ValueText valueText={title} small />
                </div>
                <div className={styles.SubHeaderKeyValue}>
                    <KeyText keyText="Upload(s)" />
                    {uploads.map((upload) => (
                            <div className={styles.uploadClick}>
                                <ValueText valueText={upload} small />
                            </div>
                        ))}
                </div>
            </FlexWrapper>
        </div>
    );
};

export default DocumentDetail;

