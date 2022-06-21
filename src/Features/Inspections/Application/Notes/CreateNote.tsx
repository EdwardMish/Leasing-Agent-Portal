import * as React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { TextArea } from '../../../../Shared/Forms';

import CategoryWithSaveRow from '../CategoryWithSaveRow';
import NavBar from '../NavBar';
import RequiresFollowUp from '../RequiresFollowUp';

interface Properties {
    handleNoteCreate: (note: string, categoryId: number, followUp: boolean) => Promise<void>;
}

const CreateNote = ({ handleNoteCreate }: Properties): React.ReactElement => {

    const createNote = (values, { resetForm, setSubmitting, }) => {

        handleNoteCreate(values.note, values.categoryId, values.requiresFollowUp)
            .then(() => {

                resetForm({
                    note: '',
                    categoryId: 1,
                    requiresFollowUp: false,
                });

                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    note: '',
                    categoryId: 1,
                    requiresFollowUp: false,
                }}
                onSubmit={createNote}
                validationSchema={
                    Yup.object({
                        note: Yup.string().required('Enter a note.'),
                    })
                }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div style={{ margin: '0 0 1rem' }}>
                            <TextArea
                                label="Note Entry"
                                id="note"
                                name="note"
                                hideLabel
                                placeholder="Enter Note..."
                                required
                            />
                        </div>
                        <div style={{ margin: '0 0 1.25rem' }}>
                            <RequiresFollowUp name="requiresFollowUp" />
                        </div>
                        <CategoryWithSaveRow disable={isSubmitting} />
                    </Form>
                )}
            </Formik>
            <NavBar />
        </>
    );
};

export default CreateNote;
