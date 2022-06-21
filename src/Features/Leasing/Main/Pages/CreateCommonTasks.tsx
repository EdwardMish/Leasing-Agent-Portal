import { API as LeasingAPI } from 'API/Leasing';
import CommonTask from 'Features/Leasing/Main/Components/CommonTask';
import { Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'Shared/Button';
import { FormButtons } from 'Shared/Forms';
import { globalMessageActionCreators } from 'State';
import * as Yup from 'yup';
import styles from './leasing-agent-module.css';

interface Properties {
    leadId: number;
    applicationId: number;
}

function CreateCustomTask({ leadId, applicationId }: Properties): JSX.Element {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();

    const detailsUrl = `${url.substring(0, url.indexOf('/create-task'))}/details`;

    const validationSchema = Yup.object().shape(
        {
            commonDocuments: Yup.array().when(['commonQuestions'], {
                is: (commonQuestions) => !!commonQuestions && commonQuestions.length > 0,
                then: Yup.array().nullable(),
                otherwise: Yup.array().min(1, 'At least 1 question or document is required.'),
            }),
            commonQuestions: Yup.array().when(['commonDocuments'], {
                is: (commonDocuments) => !!commonDocuments && commonDocuments.length > 0,
                then: Yup.array().nullable(),
                otherwise: Yup.array().min(1, 'At least 1 question or document is required.'),
            }),
        },
        [['commonDocuments', 'commonQuestions']],
    );

    const createQuestion = (question) => {
        LeasingAPI.createQuestion(leadId, applicationId, { question })
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage(`Successfully created custom question`));
                history.push(detailsUrl);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to create custom question', err)));
    };

    const createDocument = (document) => {
        LeasingAPI.createDocument(leadId, applicationId, { name: document })
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage(`Successfully created custom document`));
                history.push(detailsUrl);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to create custom document', err)));
    };

    const handleSubmit = async (values) => {
        await Promise.all(values.commonQuestions.map((question) => createQuestion(question)));
        await Promise.all(values.commonDocuments.map((document) => createDocument(document)));
    };

    return (
        <Formik
            initialValues={{
                commonDocuments: [],
                commonQuestions: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <CommonTask />
                    {errors.commonQuestions && (
                        <ErrorMessage name="commonQuestions">
                            {(errorMessage: string) => <p className={styles.Error}>{errorMessage}</p>}
                        </ErrorMessage>
                    )}
                    <div className={styles.ButtonWrapper}>
                        <div className={styles.InviteButton}>
                            <Button text="Cancel" callback={() => history.push(detailsUrl)} inverse />
                        </div>
                        <div className={styles.InviteButton}>
                            <FormButtons.Submit text="Add Task(s)" disable={isSubmitting} />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateCustomTask;
