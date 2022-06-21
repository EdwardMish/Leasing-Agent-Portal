import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React from 'react';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import { ComplianceNote } from '../../../API';
import { Add, ChevronDown, ChevronUp } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { TextArea } from '../../Forms';
import IconWithText from '../../PageElements/IconWithText';

import styles = require('./notes.module.css');

export interface ComplianceNotesProperties {
    notes: ComplianceNote[];
    canAddNote: boolean;
    addNote: (note: string) => void;
}

export const Notes: React.FC<ComplianceNotesProperties> = ({ notes, canAddNote, addNote }) => {
    const [showNotes, setShowNotes] = React.useState<boolean>(false);
    const [showAddNote, toggleAddNote] = React.useState<boolean>(false);

    const handleAddNote = (note: string) => {
        addNote(note);
        toggleAddNote(false);
    };

    return (
        <>
            <FlexWrapper
                className={`${styles.Show} ${styles.Header}`}
                justify="between"
                align="stretch"
                handleClick={() => setShowNotes(!showNotes)}
            >
                <p>Notes ({`${notes.length}`})</p>
                <div>{showNotes ? <ChevronDown /> : <ChevronUp />}</div>
            </FlexWrapper>
            {showNotes && (
                <>
                    {canAddNote && (
                        <FlexWrapper align="end" justify="end" style={{ marginTop: '.5rem' }}>
                            <div className={styles.Add} onClick={() => toggleAddNote(true)}>
                                <IconWithText Icon={Add} text="Add Note" />
                            </div>
                        </FlexWrapper>
                    )}
                    {notes
                        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                        .map((note) => (
                            <FlexWrapper key={`note-${note.id}`} justify="between" align="start" wrap className={styles.Row}>
                                <p>{note.note}</p>
                                <p>{note.noteCreator}</p>
                                <p>{format(new Date(note.created), 'LL/dd/yy - hh:mm bb')}</p>
                            </FlexWrapper>
                        ))}
                </>
            )}
            {showAddNote && (
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
                                header="Add Note"
                                actionText="Add Note"
                                disable={isSubmitting}
                                actionCallback={handleSubmit}
                                cancelCallback={() => toggleAddNote(false)}
                            >
                                <TextArea id="note" name="note" label="Note" required />
                            </ModalWithAction>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

