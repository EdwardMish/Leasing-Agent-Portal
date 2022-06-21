import { Form, Formik } from 'formik';
import React from 'react';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import { TextArea } from '../../Forms';

export interface ComplianceNotesProperties {
    requestNotRequired: (note: string) => void;
    handleClose: (status: boolean) => void;
}

const paragraphStyles: React.CSSProperties = {
    margin: '0 0 0.875rem',
    lineHeight: '1.4rem',
};
export const NotRequiredPopup: React.FC<ComplianceNotesProperties> = ({ requestNotRequired, handleClose }) => {
    const handleAddNote = (note: string) => {
        handleClose(false);
        requestNotRequired(note);
    };

    return (
        <>
            <Formik
                initialValues={{ note: '' }}
                onSubmit={(values) => {
                    handleAddNote(values.note);
                }}
                validationSchema={Yup.object({
                    note: Yup.string().required('A note is required.'),
                })}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form style={{ width: '100%', padding: '1rem' }}>
                        <ModalWithAction
                            header="Add a Note"
                            disable={isSubmitting}
                            actionText="Add Note"
                            actionCallback={handleSubmit}
                            cancelCallback={() => handleClose(false)}
                        >
                            <p style={paragraphStyles}>
                                Please provide additional reasoning as to why <br />
                                you believe plans (permits/signage) are not required for work in your space.
                            </p>
                            <TextArea id="note" name="note" label="Note" required />
                        </ModalWithAction>
                    </Form>
                )}
            </Formik>
        </>
    );
};

