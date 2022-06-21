import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Inspections from '../../../../API/Inspections';

import { ChevronLeft } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import ConfirmationModal from 'Shared/ConfirmationModal/ConfirmationModal';
import { IconWithText, NoContent } from '../../../../Shared/PageElements';

import { globalMessageActionCreators, InspectionsApp } from '../../../../State';

import { Note } from '../../../../State/Inspections/Types/Note';
import { Photo } from '../../../../State/Inspections/Types/Photo';

import { Application } from '../../../../State/Inspections';
import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';
import { Interaction } from '../../../../State/Inspections/App/Types/Interaction';
import { InspectionCategories, InspectionItem } from '../../../../State/Inspections/Types';

import AddNoteRowButton from '../Notes/AddNoteRowButton';
import NoteDisplay from '../Notes/NoteDisplay';
import AddPhotoRowButton from '../Photos/AddPhotoRowButton';
import PhotoDisplay from '../Photos/PhotoDisplay';

const InteractionDetails = (): React.ReactElement => {
    const { url } = useRouteMatch();

    const history = useHistory();

    const dispatch = useDispatch();

    const { propertyId: propertyIdParam, interactionId: interactionIdParam } = useParams<{
        propertyId: string;
        interactionId: string;
    }>();

    const propertyId = parseInt(propertyIdParam, 10);
    const interactionId = parseInt(interactionIdParam, 10);

    const [showDeleteConfirmation, toggleShowDeleteConfirmation] = React.useState<boolean>(false);

    const { activeInspection } = useActiveInspectionFromState(propertyId);

    const interaction: Interaction | null = useSelector(Application.selectors.getInteraction(interactionId));

    const deleteInteraction = async () => {
        try {
            await Inspections.deleteInteraction(activeInspection.id, interactionId);

            dispatch({
                type: InspectionsApp.Actions.DELETE_INTERACTION,
                payload: interactionId,
            });

            history.goBack();
        } catch (err) {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to delete the interaction, please try again.'));
        }
    };

    const createNote = async (note: string, categoryId: number, followUp: boolean) => {
        const { itemId } = await Inspections.addItem(activeInspection.id, note, followUp, categoryId, interaction?.id);

        dispatch({
            type: InspectionsApp.Actions.INTERACTION_ADD_NOTE,
            payload: {
                interactionId: interaction?.id,
                note: {
                    id: itemId,
                    note,
                    categoryId,
                    followUp,
                } as InspectionItem,
            },
        } as InspectionsApp.ActionTypes);
    };

    return (
        <div>
            <Link to={`${url.substr(0, url.lastIndexOf('/'))}`}>
                <IconWithText Icon={ChevronLeft} iconOnLeft text="Back to Interaction List" />
            </Link>
            <>
                <h4>Notes</h4>
                {!!interaction && interaction.notes.length > 0 ? (
                    interaction.notes.map((note: Note) => (
                        <NoteDisplay
                            key={`note-${note.id}`}
                            id={note.id}
                            categoryId={note.categoryId}
                            followUp={note.followUp}
                            display={note.note || ''}
                            editable
                            onEdit={(noteId: number) => history.push(`/app/inspections/${propertyId}/notes/${noteId}`)}
                        />
                    ))
                ) : (
                    <NoContent message="No notes found." />
                )}
                <AddNoteRowButton handleNoteCreate={createNote} />
                <h4> Photos</h4>
                {!!interaction && interaction.photos.length > 0 ? (
                    interaction.photos.map((photo: Photo) => (
                        <PhotoDisplay
                            key={`photo-${photo.id}`}
                            propertyId={propertyId}
                            inspectionId={activeInspection.id}
                            photo={photo}
                        />
                    ))
                ) : (
                    <NoContent message="No photos found." />
                )}
                <AddPhotoRowButton
                    addFiles={(files: File[]) => {
                        const currentTime: number = Date.now();

                        files.forEach((file: File, index: number) => {
                            const photo: Photo = {
                                id: currentTime + index,
                                followUp: false,
                                categoryId: InspectionCategories.Property,
                                file,
                                interactionId,
                            };

                            Inspections.addPhotoAsEmptyItem(activeInspection.id, file, { interactionId }).then(
                                ({ itemId, imageId }) => {
                                    dispatch({
                                        type: InspectionsApp.Actions.INTERACTION_ADD_PHOTO,
                                        payload: {
                                            interactionId,
                                            photo: {
                                                id: itemId,
                                                imageId,
                                                categoryId: photo.categoryId,
                                                followUp: photo.followUp,
                                                interactionId,
                                                note: photo.note,
                                            } as Photo,
                                        },
                                    } as InspectionsApp.ActionTypes);
                                },
                            );
                        });
                    }}
                />
            </>
            <Button
                callback={() => toggleShowDeleteConfirmation(true)}
                text="Delete Interaction"
                fullWidth
                withMarginTop
                style={{
                    backgroundColor: 'var(--color-WarningRed)',
                    borderColor: 'var(--color-WarningRed)',
                    color: '#FFFFFF',
                }}
            />
            {showDeleteConfirmation && (
                <ConfirmationModal
                    header="Confirm Delete"
                    onCancel={() => toggleShowDeleteConfirmation(false)}
                    onConfirm={() => deleteInteraction()}
                >
                    <p>Deleting this interaction will delete all notes and photos associated with this interaction.</p>
                </ConfirmationModal>
            )}
        </div>
    );
};

export default InteractionDetails;

