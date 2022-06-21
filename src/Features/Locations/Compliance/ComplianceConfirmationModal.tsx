import { Form, Formik } from 'formik';
import React from 'react';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import { TextArea } from '../../../Shared/Forms';

interface Properties {
    title: string;
    noteLabel: string;
    noteRequired?: boolean;
    confirm: (note: string) => void;
    handleCancel: () => void;
    children?: React.ReactNode;
}

export default ({
    title,
    noteLabel,
    noteRequired = false,
    confirm,
    handleCancel,
    children,
}: Properties): React.ReactElement => (
    <Formik
        initialValues={{ note: '' }}
        onSubmit={(values) => {
            confirm(values.note);
        }}
        validationSchema={
            noteRequired
                ? Yup.object({
                      note: Yup.string().required('A note is required.'),
                  })
                : Yup.object({
                      note: Yup.string(),
                  })
        }
    >
        {({ isSubmitting, handleSubmit }) => (
            <Form style={{ width: '100%', padding: '1rem' }}>
                <ModalWithAction
                    header={title}
                    actionText="Confirm"
                    disable={isSubmitting}
                    actionCallback={handleSubmit}
                    cancelCallback={handleCancel}
                >
                    {children}
                    <TextArea id="note" name="note" label={noteLabel} required={noteRequired} />
                </ModalWithAction>
            </Form>
        )}
    </Formik>
);

