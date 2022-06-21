import { Note } from '../Types/Note';
import { Photo } from '../Types/Photo';

import { ActiveInspection } from './Types/ActiveInspection';
import { Interaction } from './Types/Interaction';
import { Property } from './Types/Property';

export enum InspectionsApplicationActions {
    LOAD_PROPERTIES = 'INSPECTIONS_APPLICATION_LOAD_PROPERTIES',
    SET_PROPERTIES = 'INSPECTIONS_APPLICATION_SET_PROPERTIES',
    REMOVE_DRAFT_FROM_PROPERTY = 'INSPECTIONS_REMOVE_DRAFT_FROM_PROPERTY',

    SET_ACTIVE_INSPECTION = 'INSPECTIONS_APPLICATION_SET_ACTIVE_INSPECTION',
    RESET_ACTIVE_INSPECTION = 'INSPECTIONS_RESET_ACTIVE_INSPECTION',

    ADD_NOTE = 'INSPECTIONS_APPLICATION_ADD_NOTE',
    UPDATE_NOTE = 'INSPECTIONS_APPLICATION_UPDATE_NOTE',
    DELETE_NOTE = 'INSPECTIONS_APPLICATION_DELETE_NOTE',

    ADD_PHOTO = 'INSPECTIONS_APPLICATION_ADD_PHOTO',
    UPDATE_PHOTO = 'INSPECTIONS_APPLICATION_UPDATE_PHOTO',
    DELETE_PHOTO = 'INSPECTIONS_APPLICATION_DELETE_PHOTO',

    ADD_PENDING_PHOTOS = 'INSPECTIONS_APPLICATION_ADD_PENDING_PHOTOS',
    REMOVE_PENDING_PHOTO = 'INSPECTIONS_APPLICATION_REMOVE_PENDING_PHOTO',

    UPDATE_UPLOADING_STATUS = 'INSPECTIONS_APPLICATION_UPDATE_UPLOADING_STATUS',

    ADD_INTERACTION = 'INSPECTIONS_APPLICATION_ADD_INTERACTION',
    DELETE_INTERACTION = 'INSPECTIONS_APPLICATION_DELETE_INTERACTION',
    INTERACTION_ADD_NOTE = 'INSPECTIONS_INTERACTION_ADD_NOTE',
    INTERACTION_ADD_PHOTO = 'INSPECTIONS_INTERACTION_ADD_PHOTO',

    /* Active Interaction */
    SET_ACTIVE_INTERACTION = 'INSPECTIONS_APPLICATION_SET_ACTIVE_INTERACTION',
    RESET_ACTIVE_INTERACTION = 'INSPECTIONS_APPLICATION_RESET_ACTIVE_INTERACTION',

    ACTIVE_INTERACTION_SET_OCCUPANT = 'INSPECTIONS_ACTIVE_INTERACTION_SET_OCCUPANT',

    ACTIVE_INTERACTION_ADD_NOTE = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_ADD_NOTE',
    ACTIVE_INTERACTION_UPDATE_NOTE = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_UPDATE_NOTE',
    ACTIVE_INTERACTION_DELETE_NOTE = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_DELETE_NOTE',

    ACTIVE_INTERACTION_ADD_PHOTO = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_ADD_PHOTO',
    //ACTIVE_INTERACTION_UPDATE_PHOTO = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_UPDATE_PHOTO',
    //ACTIVE_INTERACTION_DELETE_PHOTO = 'INSPECTIONS_APPLICATION_ACTIVE_INTERACTION_DELETE_PHOTO',
}

/* Active Inspection */
interface LoadPropertiesAction {
    type: typeof InspectionsApplicationActions.LOAD_PROPERTIES;
}

interface SetPropertiesAction {
    type: typeof InspectionsApplicationActions.SET_PROPERTIES;
    payload: Property[];
}

interface RemoveDraftFromPropertyAction {
    type: typeof InspectionsApplicationActions.REMOVE_DRAFT_FROM_PROPERTY;
    payload: number | string;
}

interface SetActiveInspectionAction {
    type: typeof InspectionsApplicationActions.SET_ACTIVE_INSPECTION;
    payload: ActiveInspection;
}

interface ResetActiveInspectionAction {
    type: typeof InspectionsApplicationActions.RESET_ACTIVE_INSPECTION;
}

/* Notes */
interface AddNoteAction {
    type: typeof InspectionsApplicationActions.ADD_NOTE;
    payload: Note;
}

interface UpdateNoteAction {
    type: typeof InspectionsApplicationActions.UPDATE_NOTE;
    payload: Note;
}

interface DeleteNoteAction {
    type: typeof InspectionsApplicationActions.DELETE_NOTE;
    payload: number;
}

interface AddPhotoAction {
    type: typeof InspectionsApplicationActions.ADD_PHOTO;
    payload: Photo;
}

interface UpdatePhotoAction {
    type: typeof InspectionsApplicationActions.UPDATE_PHOTO;
    payload: Photo;
}

interface DeletePhotoAction {
    type: typeof InspectionsApplicationActions.DELETE_PHOTO;
    payload: number;
}

interface AddPendingPhotosAction {
    type: typeof InspectionsApplicationActions.ADD_PENDING_PHOTOS;
    payload: Photo[];
}

interface RemovePendingPhotoAction {
    type: typeof InspectionsApplicationActions.REMOVE_PENDING_PHOTO;
    payload: number;
}

interface UpdateUploadingStatusAction {
    type: typeof InspectionsApplicationActions.UPDATE_UPLOADING_STATUS;
    payload: boolean;
}

interface AddInteractionAction {
    type: typeof InspectionsApplicationActions.ADD_INTERACTION;
    payload: Interaction;
}

interface DeleteInteractionAction {
    type: typeof InspectionsApplicationActions.DELETE_INTERACTION;
    payload: number;
}

interface InteractionAddNoteAction {
    type: typeof InspectionsApplicationActions.INTERACTION_ADD_NOTE;
    payload: {
        interactionId: number;
        note: Note;
    };
}

interface InteractionAddPhotoAction {
    type: typeof InspectionsApplicationActions.INTERACTION_ADD_PHOTO;
    payload: {
        interactionId: number;
        photo: Photo;
    };
}

/* Active Interaction */
interface SetActiveInteractionAction {
    type: typeof InspectionsApplicationActions.SET_ACTIVE_INTERACTION;
    payload: Interaction;
}

interface ResetActiveInteractionAction {
    type: typeof InspectionsApplicationActions.RESET_ACTIVE_INTERACTION;
}

interface ActiveInteractionSetOccupantAction {
    type: typeof InspectionsApplicationActions.ACTIVE_INTERACTION_SET_OCCUPANT;
    payload: number;
}

interface ActiveInteractionAddNoteAction {
    type: typeof InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_NOTE;
    payload: Note;
}

interface ActiveInteractionUpdateNoteAction {
    type: typeof InspectionsApplicationActions.ACTIVE_INTERACTION_UPDATE_NOTE;
    payload: Note;
}

interface ActiveInteractionDeleteNoteAction {
    type: typeof InspectionsApplicationActions.ACTIVE_INTERACTION_DELETE_NOTE;
    payload: number;
}

interface ActiveInteractionAddPhotoAction {
    type: typeof InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_PHOTO;
    payload: Photo;
}

export type InspectionsApplicationActionTypes =
    | SetActiveInspectionAction
    | ResetActiveInspectionAction
    | AddNoteAction
    | UpdateNoteAction
    | LoadPropertiesAction
    | SetPropertiesAction
    | RemoveDraftFromPropertyAction
    | DeleteNoteAction
    | AddPhotoAction
    | UpdatePhotoAction
    | DeletePhotoAction
    | AddPendingPhotosAction
    | RemovePendingPhotoAction
    | UpdateUploadingStatusAction
    // Interaction Actions
    | AddInteractionAction
    | DeleteInteractionAction
    | InteractionAddNoteAction
    | InteractionAddPhotoAction
    // Active Interaction Actions
    | SetActiveInteractionAction
    | ResetActiveInteractionAction
    | ActiveInteractionSetOccupantAction
    | ActiveInteractionAddNoteAction
    | ActiveInteractionDeleteNoteAction
    | ActiveInteractionUpdateNoteAction
    | ActiveInteractionAddPhotoAction;
