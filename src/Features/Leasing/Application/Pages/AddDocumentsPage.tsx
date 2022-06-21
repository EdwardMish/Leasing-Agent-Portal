import useDocumentsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationDocumentsState';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow } from 'Shared/Forms';
import { Label } from 'Shared/Forms/Label';
import { Divider, Title } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import * as Yup from 'yup';
import styles from './assets-liabilities.module.css';

interface AddDocumentPageProps {
    previous: string;
}

const AddDocumentPage = ({ previous }: AddDocumentPageProps): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { state: linkedState } = useLocation<Record<string, any>>();
    const requiredDocument = linkedState?.document;
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

    const { createCustomDocument, createRequiredDocument, creatingDocument } = useDocumentsState();

    const initialValues = {
        documentlabel: requiredDocument ? requiredDocument?.name : '',
        attachment: null,
    };

    const validationSchema = Yup.object({
        documentlabel: Yup.string()
            .required('Document Label is required')
            .min(3, 'Document Label must be greater than 3 characters')
            .max(100, 'Document Label must be smaller than 100 characters'),
        attachment: Yup.mixed().required('Attachment is required'),
    });

    const submitHandler = async (values) => {
        try {
            if (requiredDocument) {
                await createRequiredDocument(requiredDocument.id, values);
            } else {
                await createCustomDocument(values);
            }

            dispatch(globalMessageActionCreators.addSuccessMessage('Your Document data was successfully sent'));
            history.push(previous);
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to send your Document, please review your data',
                    err,
                ),
            );
        }
    };

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper justify="between" align="start">
                    <Title title="Custom Document Upload" />
                </FlexWrapper>
                <Divider />

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <FormRow>
                                {requiredDocument ? (
                                    <Title
                                        level="h3"
                                        title={`Your Leasing Agent has Requested you to upload: ${requiredDocument.name}`}
                                    />
                                ) : (
                                    <FormInputs.Text
                                        id="documentlabel"
                                        name="documentlabel"
                                        label="Document Label"
                                        required
                                    />
                                )}
                            </FormRow>
                            <Label label="Please upload supporting documentation" id="upload" required margin="0 0 1rem" />
                            <FormRow>
                                <FormInputs.UploadFile
                                    id="attachment"
                                    name="attachment"
                                    label="Select Document"
                                    required
                                    accept="application/pdf,image/*"
                                    showThumbnail={false}
                                    multiple
                                />
                            </FormRow>
                            <FormRow>
                                <div className={styles.ButtonWrapper}>
                                    <FlexWrapper align="center" justify="between">
                                        <Button text="Back" callback={goBackHandler} inverse />
                                        <FormButtons.Submit
                                            text={creatingDocument ? 'Saving' : 'Save'}
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

export default AddDocumentPage;
