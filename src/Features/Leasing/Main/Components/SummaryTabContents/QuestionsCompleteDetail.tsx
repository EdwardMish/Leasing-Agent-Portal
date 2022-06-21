import * as React from 'react';

import ValueText from 'Shared/PageElements/ValueText';
import { FlexWrapper } from 'Shared/FlexWrapper';

import { Question } from 'API/Leasing/Types';
import styles from './summaryContent.module.css';

const QuestionsCompleteDetail = ({ question, answer }: Question) => {
    return (
        <div>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText={question} />
            </FlexWrapper>

            <div className={styles.AnswerContainer}>
                <ValueText valueText={answer || ''} small />
            </div>
        </div>
    );
};

export default QuestionsCompleteDetail;
