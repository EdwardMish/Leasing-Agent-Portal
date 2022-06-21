import React from 'react';

import TenantUpload from './TenantUpload';
import Title from '../../Shared/PageElements/Title';
import Divider from '../../Shared/PageElements/Divider';
import NavigationButtons from '../molecules/NavigationButtons';
import styles from './assets-liabilities.module.css';
import { SecondaryTitle } from '../../Shared/PageElements';
import FullPageFormLine from '../molecules/FullPageFormLine';

interface DocumentUploadProps {
    requested?: boolean;
    document?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ requested = false, document }) => {
    return (
        <div className={styles.PageWrapper}>
            <Title title="Custom Document Upload" />

            <Divider />
            {requested ? (
                <div>
                    <SecondaryTitle title={`Your Leasing Agent has Requested you upload: ${document}`} noBorderBottom />
                    {/* <ValueText valueText="Tax Returns from 2021"/> */}
                </div>
            ) : (
                <FullPageFormLine />
            )}

            <TenantUpload document="Custom Document (required)" />
            <NavigationButtons leftTitle="Back" rightTitle="Save" />
        </div>
    );
};

export default DocumentUpload;

