import { API as LeasingAPI } from 'API/Leasing';
import CustomTask from 'Features/Leasing/Main/Components/CustomTask';
import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import { Form, Formik } from 'formik';
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

    return (
        <Formik
            initialValues={{
                type: TaskType.Document,
                document: '',
                question: '',
            }}
            onSubmit={(values) => {
                switch (values.type) {
                    case TaskType.Question: {
                        return createQuestion(values.question);
                    }
                    case TaskType.Document: {
                        return createDocument(values.document);
                    }
                    default: {
                        throw new Error('Unknown task type specified.');
                    }
                }
            }}
            validationSchema={Yup.object({
                type: Yup.string().required('Type is Required'),
                question: Yup.string().when('type', {
                    is: TaskType.Question,
                    then: Yup.string()
                        .required('A question is required')
                        .min(10, 'A question must be 10 characters or more')
                        .max(4000, 'A question must be 4000 characters or less'),
                }),
                document: Yup.string().when('type', {
                    is: TaskType.Document,
                    then: Yup.string()
                        .required('A document name is required')
                        .min(10, 'A document name must be 10 characters or more')
                        .max(200, 'A document name must be 200 characters or less'),
                }),
            })}
        >
            {({ isSubmitting }) => (
                <Form>
                    <CustomTask />
                    <div className={styles.ButtonWrapper}>
                        <div className={styles.InviteButton}>
                            <Button text="Cancel" callback={() => history.push(detailsUrl)} inverse />
                        </div>
                        <div className={styles.InviteButton}>
                            <FormButtons.Submit text="Add Task" disable={isSubmitting} />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateCustomTask;
