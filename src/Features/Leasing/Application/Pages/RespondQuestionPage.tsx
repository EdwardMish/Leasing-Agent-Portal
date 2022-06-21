import useQuestionsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationQuestionsState';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormRow, TextArea } from 'Shared/Forms';
import { Divider, Title } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import * as Yup from 'yup';
import styles from './assets-liabilities.module.css';

const RespondQuestionPage = ({ previous }): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { respondQuestion, respondingQuestion } = useQuestionsState();
    const { state: linkedState } = useLocation<Record<string, any>>();
    const question = linkedState?.question;
    const goBackLink = linkedState?.goBackLink;

    const goBackHandler = () => {
        if (goBackLink) {
            history.push(goBackLink);
        } else if (previous) {
            history.push(previous);
        } else {
            history.goBack();
        }
    };

    const initialValues = {
        answer: '',
    };

    const validationSchema = Yup.object({
        answer: Yup.string()
            .required('Answer is required')
            .min(1, 'Answer must be larger than 1 characters')
            .max(4000, 'Answer must be shorter than 4000 characters'),
    });

    const submitHandler = async (values) => {
        try {
            await respondQuestion(question?.id, values.answer);

            dispatch(globalMessageActionCreators.addSuccessMessage('Your Answer was successfully sent'));
            history.push(previous);
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to send your Answer, please review your data',
                    err,
                ),
            );
        }
    };

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper justify="between" align="start">
                    <Title title="Leasing Agent Question" />
                </FlexWrapper>
                <Divider />
                <Title level="h3" title={question?.question} />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <FormRow>
                                <TextArea
                                    name="answer"
                                    id="answer"
                                    hideLabel
                                    label=""
                                    required
                                    rows={4}
                                    placeholder={'Please, answer this question'}
                                />
                            </FormRow>

                            <FormRow>
                                <div className={styles.ButtonWrapper}>
                                    <FlexWrapper align="center" justify="between">
                                        <Button text="Back" callback={goBackHandler} inverse />
                                        <FormButtons.Submit
                                            text={respondingQuestion ? 'Saving' : 'Save'}
                                            disable={isSubmitting || !isValid}
                                        />
                                    </FlexWrapper>
                                </div>
                            </FormRow>
                        </Form>
                    )}
                </Formik>
            </main>
        </ApplicationPageWrapper>
    );
};

export default RespondQuestionPage;
