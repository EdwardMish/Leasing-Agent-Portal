import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Inspections from '../../../../API/Inspections';

import { InspectionItem } from '../../Types/InspectionItem';
import { Note } from '../../Types/Note';
import { Photo } from '../../Types/Photo';

import { InspectionsApplicationActions, InspectionsApplicationActionTypes } from '../actions';
import * as selectors from '../selectors';

import ActiveInspectionStatus from '../Types/ActiveInspectionStatus';
import { InspectionCategories } from '../../Types/InspectionCategories';
import { Property } from '../Types/Property';
import { ActiveInspection } from '../Types/ActiveInspection';
import { activeInteractionInitialState, Interaction } from '../Types/Interaction';

interface ActiveInspectionFromStateHook {
    activeInspection: ActiveInspection;
    inspectionItems: InspectionItem[];
    notes: Note[];
    interactions: Interaction[];
    propertiesAreLoaded: boolean;
    property: Property;
    // Functions
    addNote: (note: Note) => Promise<void>;
    addPhotos: (photos: File[], options?: { categoryId?: number }) => void;
    addInteraction: (interaction: Interaction) => Promise<number>;
    resetInspection: () => void;
    completeInspection: () => void;
}

const defaultInspection = {
    sortOrder: [],
    interactions: {},
    activeInteraction: activeInteractionInitialState,
    notes: {},
    pendingUploads: [],
    photos: {
        sortOrder: [],
        pendingUpload: [],
    },
    status: ActiveInspectionStatus.Saved,
    uploading: false,
};

const useActiveInspectionFromState = (propertyId: number | string): ActiveInspectionFromStateHook => {
    const dispatch = useDispatch();

    const inspection: ActiveInspection = useSelector(selectors.activeInspection);

    const inspectionItems: InspectionItem[] = useSelector(selectors.activeInspectionItems);
    const notes: Note[] = useSelector(selectors.notesList);
    const interactions: Interaction[] = useSelector(selectors.interactionsList);
    const status: ActiveInspectionStatus = useSelector(selectors.activeInspectionStatus);

    const propertiesAreLoaded: boolean = useSelector(selectors.propertiesAreLoaded);
    const property: Property = useSelector(selectors.property(propertyId));

    React.useEffect(() => {
        if (inspection && `${inspection.propertyId}` !== `${propertyId}`) {
            dispatch({
                type: InspectionsApplicationActions.RESET_ACTIVE_INSPECTION,
            } as InspectionsApplicationActionTypes);
        }
    }, [propertyId]);

    // To add items or create an inspection, verify:
    // We've verified no drafts for user for property
    // There's an active inspection
    const canAdd: boolean = status !== ActiveInspectionStatus.null && Object.prototype.hasOwnProperty.call(inspection, 'id');

    const createInspection = async (): Promise<number> => {
        const { inspectionId } = await Inspections.createInspection(propertyId);

        dispatch({
            type: InspectionsApplicationActions.SET_ACTIVE_INSPECTION,
            payload: {
                ...defaultInspection,
                id: inspectionId,
                propertyId,
            } as ActiveInspection,
        } as InspectionsApplicationActionTypes);

        return inspectionId;
    };

    const addNote = async ({ note = '', followUp, categoryId }: Note): Promise<void> => {
        let inspectionId = canAdd ? inspection.id : await createInspection();

        const { itemId } = await Inspections.addItem(inspectionId, note, followUp, categoryId);

        dispatch({
            type: InspectionsApplicationActions.ADD_NOTE,
            payload: {
                note,
                followUp,
                categoryId,
                id: itemId,
            },
        } as InspectionsApplicationActionTypes);
    };

    const addPhotos = async (files: File[], options?: { categoryId?: number }): Promise<void> => {
        const currentTime: number = Date.now();

        if (!canAdd) await createInspection();

        dispatch({
            type: InspectionsApplicationActions.ADD_PENDING_PHOTOS,
            payload: files.map(
                (file: File, index: number) =>
                    ({
                        id: currentTime + index,
                        file,
                        categoryId: options?.categoryId || InspectionCategories.Property,
                        followUp: false,
                    } as Photo)
            ) as Photo[],
        } as InspectionsApplicationActionTypes);
    };

    const addInteraction = async (interaction: Interaction): Promise<number> => {
        let inspectionId = canAdd ? inspection.id : await createInspection();

        const { interactionId } = await Inspections.addInteraction(inspectionId, interaction.occupantId);

        dispatch({
            type: InspectionsApplicationActions.ADD_INTERACTION,
            payload: {
                id: interactionId,
                createdDate: new Date(Date.now()).toLocaleString(),
                occupantId: interaction.occupantId,
                occupantName: property.occupants.find((o) => o.id === interaction.occupantId)?.name || 'Unknown',
                notes: [],
                photos: [],
            },
        } as InspectionsApplicationActionTypes);

        interaction.notes.forEach(async (note: Note) => {
            addNoteToInteraction(inspectionId, note, interactionId);
        });

        interaction.photos.forEach(async (photo: Photo) => {
            addPhotoToInteraction(inspectionId, photo, interactionId);
        });

        return interactionId;
    };

    const addNoteToInteraction = async (inspectionId: number, note: Note, interactionId: number) => {
        if (!note.note) throw new Error('No note text specified.');

        const { itemId } = await Inspections.addItem(inspectionId, note.note, note.followUp, note.categoryId, interactionId);

        dispatch({
            type: InspectionsApplicationActions.INTERACTION_ADD_NOTE,
            payload: {
                interactionId,
                note: {
                    id: itemId,
                    categoryId: note.categoryId,
                    followUp: note.followUp,
                    note: note.note,
                } as Note,
            },
        } as InspectionsApplicationActionTypes);
    };

    const addPhotoToInteraction = async (inspectionId: number, photo: Photo, interactionId: number) => {
        if (photo.file == null) throw new Error('File must be valid for photo upload.');

        const { itemId, imageId } = await Inspections.addPhotoAsEmptyItem(inspectionId, photo.file, { interactionId });

        dispatch({
            type: InspectionsApplicationActions.REMOVE_PENDING_PHOTO,
            payload: photo.id,
        } as InspectionsApplicationActionTypes);

        dispatch({
            type: InspectionsApplicationActions.INTERACTION_ADD_PHOTO,
            payload: {
                interactionId,
                photo: {
                    id: itemId,
                    categoryId: photo.categoryId,
                    followUp: photo.followUp,
                    note: photo.note,
                    imageId,
                } as Photo,
            },
        } as InspectionsApplicationActionTypes);
    };

    const resetInspection = (): void => {
        if (inspection) {
            dispatch({
                type: InspectionsApplicationActions.RESET_ACTIVE_INSPECTION,
            } as InspectionsApplicationActionTypes);
        }
    };

    async function completeInspection(): Promise<void> {
        if (inspection) {
            await Inspections.completeInspection(inspection.id);

            dispatch({
                type: InspectionsApplicationActions.RESET_ACTIVE_INSPECTION,
            } as InspectionsApplicationActionTypes);

            dispatch({
                type: InspectionsApplicationActions.REMOVE_DRAFT_FROM_PROPERTY,
                payload: propertyId,
            } as InspectionsApplicationActionTypes);
        }
    }

    return {
        activeInspection: inspection,
        inspectionItems,
        notes,
        interactions,
        propertiesAreLoaded,
        property,
        addNote,
        addPhotos,
        addInteraction,
        resetInspection,
        completeInspection,
    };
};

export default useActiveInspectionFromState;
