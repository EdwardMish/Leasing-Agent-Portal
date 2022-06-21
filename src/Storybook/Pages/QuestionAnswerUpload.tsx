import React from 'react';

import Title from '../../Shared/PageElements/Title';
import Divider from '../../Shared/PageElements/Divider';
import NavigationButtons from '../molecules/NavigationButtons';
import UploadStatementCustomTask from '../../Shared/PageElements/UploadStatementCustomTask';
import { leasingAgentQuestion } from '../dummyData/dummyData';

import styles from './assets-liabilities.module.css';

interface QuestionUploadProps {}

const QuestionUpload: React.FC<QuestionUploadProps> = () => {
    return (
        <div className={styles.PageWrapper}>
            <Title title="Leasing Agent Question" />

            <Divider />
            <UploadStatementCustomTask message={leasingAgentQuestion} />
            <textarea className={styles.MockTextArea} placeholder={'Your Response'} />
            <NavigationButtons leftTitle="Back" rightTitle="Save" />
        </div>
    );
};

export default QuestionUpload;
