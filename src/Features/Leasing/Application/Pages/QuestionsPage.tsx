import { Question } from 'API/Leasing/Types';
import ReviewPanel from 'Features/Leasing/Application/Components/ReviewPanel';
import useQuestionsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationQuestionsState';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { ValueText } from 'Shared/PageElements';

import { Divider, LoadingContent, NoContent, Title } from 'Shared/PageElements';
import { SingleLabelValue } from '../GeneralSidebar';
import styles from './assets-liabilities.module.css';

const QuestionsPage = ({ previous, respondQuestionLink }): React.ReactElement => {
    const history = useHistory();

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());

    const { loadingQuestions, questions, errorMessage, totalQuestions, getQuestions } = useQuestionsState();

    useEffect(() => {
        getQuestions();
    }, []);

    const getSidebar = (question: Question) => {
        const respondOption = !question?.answeredDate
            ? {
                  edit: {
                      link: respondQuestionLink,
                      state: { question },
                  },
              }
            : {};

        return (
            <ReviewPanel key={question?.id} title={question.question} options={respondOption}>
                <ValueText valueText={question?.answer} small />
            </ReviewPanel>
        );
    };

    const loading = loadingQuestions;

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper align="start" justify="between" fullWidth>
                    <Title title="Questions Overview" />
                    <SingleLabelValue label="Total Questions" value={totalQuestions} style={{ width: 'auto' }} />
                </FlexWrapper>
                <Divider />
                {loading && <LoadingContent />}
                {errorMessage && <NoContent message={errorMessage} />}
                {questions.map((question) => getSidebar(question))}
                <div className={styles.ButtonWrapper}>
                    <Button text="Back" callback={goBackHandler} inverse />
                </div>
            </main>
        </ApplicationPageWrapper>
    );
};

export default QuestionsPage;
