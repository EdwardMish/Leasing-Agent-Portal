import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Inspections from '../../../../API/Inspections';

import { IconColors } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import ConfirmationModal from 'Shared/ConfirmationModal/ConfirmationModal';
import { TextArea } from '../../../../Shared/Forms';

import { globalMessageActionCreators, InspectionsApp } from '../../../../State';
import { InspectionItem } from '../../../../State/Inspections/Types';
import { Note } from '../../../../State/Inspections/Types/Note';

import CategoryWithSaveRow from '../CategoryWithSaveRow';
import NavBar from '../NavBar';
import RequiresFollowUp from '../RequiresFollowUp';

const EditNote: React.FC = () => {
    const dispatch = useDispatch();

    const history = useHistory();
    const { noteId } = useParams<{ propertyId: string, noteId: string }>();

    const inspectionId: number = useSelector(InspectionsApp.selectors.activeInspectionId);
    const note: Note | null = useSelector(
        InspectionsApp.selectors.note(noteId),
    );

    const [confirmationModal, toggleConfirmationModal] = React.useState<boolean>(false);

    const routeBack = () => {
        history.goBack();
    };

    const showConfirm = () => {
        toggleConfirmationModal(true);
    };

    const hideConfirm = () => {
        toggleConfirmationModal(false);
    };

    const editNote = ({ id, followUp, categoryId, note }, { setSubmitting }) => {
        Inspections.updateItem(inspectionId, id, followUp, categoryId, note)
            .then(() => {
                dispatch({
                    type: InspectionsApp.Actions.UPDATE_NOTE,
                    payload: { id, note, followUp, categoryId } as InspectionItem,
                });

                setSubmitting(false);
                routeBack();
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    const deleteNote = () => {
        if (!note) return;

        Inspections.deleteItem(inspectionId, note.id)
            .then(() => {
                dispatch({
                    type: InspectionsApp.Actions.DELETE_NOTE,
                    payload: parseInt(noteId, 10),
                });
                routeBack();
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage(
                    'We were not able to delete your note at this time.',
                ));
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    id: note?.id,
                    note: note?.note || '',
                    categoryId: note?.categoryId || 1,
                    followUp: note?.followUp || false,
                }}
                onSubmit={editNote}
                validationSchema={
                    Yup.object({
                        note: Yup.string().required('Enter a note.'),
                    })
                }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TextArea
                            label="Note Entry"
                            id="note"
                            name="note"
                            hideLabel
                            placeholder="Enter Note..."
                            required
                        />
                        <RequiresFollowUp name="followUp" />
                        <CategoryWithSaveRow disable={isSubmitting} />
                    </Form>
                )}
            </Formik>
            <Button
                text="Cancel"
                callback={routeBack}
                fullWidth
                inverse
                withMarginTop
            />
            <Button
                text="Delete"
                callback={showConfirm}
                fullWidth
                withMarginTop
                style={{
                    backgroundColor: IconColors.WarningRed,
                    borderColor: IconColors.WarningRed,
                }}
            />
            <NavBar />
            {
                confirmationModal
                && (
                    <ConfirmationModal
                        header="Confirm Delete"
                        onCancel={hideConfirm}
                        onConfirm={deleteNote}
                    >
                        <p>Deleting this note will remove it from the inspection.</p>
                    </ConfirmationModal>
                )
            }
        </>
    );
};

export default EditNote;
