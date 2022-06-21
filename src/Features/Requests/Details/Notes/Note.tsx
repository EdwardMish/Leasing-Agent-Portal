import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../../../Shared/Button';
import { ButtonRow } from '../../../../Shared/ButtonRow';
import { EditorContentDisplay } from '../../../../Shared/Content';
import { FormButtons } from '../../../../Shared/Forms';
import Editor from '../../../../Shared/Forms/Editor';

import { CurrentUserState } from '../../../../State';

const styles = require('./notes.module.css');

interface NotesProps {
    note: RequestsTypes.NotesResponse;
    readOnly: boolean;
    requestId: number;
}

export const Note: React.FC<NotesProps> = ({ note, readOnly, requestId }) => {
    const { createdBy, createdByUserId, createdDate, id, note: noteText } = note;

    const currentUserId: number = useSelector(CurrentUserState.selectors.currentUserId);
    const currentUserIsOO: boolean = useSelector(CurrentUserState.selectors.currentUserIsOwnerOperator);

    const [text, setText] = React.useState<string>(noteText);
    const [editingNote, toggleNoteEditor] = React.useState<boolean>(false);

    const editNoteText = ({ description }) => {
        RequestsAPI.editNote(requestId, id, description).then(() => {
            setText(description);
            toggleNoteEditor(false);
        });
    };

    return (
        <>
            <div className={styles.RequestNoteHeader}>
                <p>{createdBy}</p>
                <div className={styles.RequestNoteHeaderRight}>
                    <p>{format(new Date(createdDate), 'LL/dd/yy p')}</p>
                </div>
            </div>
            <div className={styles.RequestNoteContent}>
                {editingNote ? (
                    <Formik
                        initialValues={{ description: text }}
                        onSubmit={editNoteText}
                        validationSchema={Yup.object({
                            description: Yup.string()
                                .max(4000, 'The update is too long.')
                                .required('A description is required'),
                        })}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form>
                                <div className={`${styles.FormRow}`}>
                                    <Editor
                                        required
                                        id="description"
                                        name="description"
                                        label="Enter Description"
                                        placeholder="Enter Description..."
                                        hideLabel
                                        hideImageUpload
                                    />
                                </div>
                                <ButtonRow withMarginTop>
                                    <Button
                                        callback={() => {
                                            toggleNoteEditor(false);
                                        }}
                                        text="Cancel"
                                        inverse
                                    />
                                    <FormButtons.Submit text="Add Update" disable={isSubmitting || !isValid} />
                                </ButtonRow>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <>
                        <div className={styles.RequestNoteText}>
                            <EditorContentDisplay content={text} />
                        </div>
                        {!readOnly && (createdByUserId === currentUserId || currentUserIsOO) && (
                            <div className={styles.NoteAdminRow}>
                                <p onClick={() => toggleNoteEditor(true)}>Edit</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

