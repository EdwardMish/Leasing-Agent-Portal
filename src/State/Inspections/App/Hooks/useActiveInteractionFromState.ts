import { useDispatch, useSelector } from 'react-redux';

import { InspectionsApplicationActions, InspectionsApplicationActionTypes } from '../actions';
import * as selectors from '../selectors';

import { Note } from '../../Types/Note';
import { Photo } from '../../Types/Photo';

import { Interaction } from '../Types/Interaction';

import useActiveInspectionFromState from './useActiveInspectionFromState';

interface ActiveInteractionFromStateHook {
    hasActiveInteraction: boolean;
    activeInteraction: Interaction;
    setOccupant: (occupantId: number) => Promise<void>;
    addNote: (note: Note) => Promise<void>;
    deleteNote: (noteId: number) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    addPhoto: (photo: Photo) => Promise<void>;
    completeActiveInteraction: () => Promise<void>;
    resetActiveInteraction: () => Promise<void>;
}

const useActiveInteractionFromState = (propertyId: number): ActiveInteractionFromStateHook => {
    const dispatch = useDispatch();

    const { addInteraction } = useActiveInspectionFromState(propertyId);

    const hasActiveInteraction: boolean = useSelector(selectors.hasActiveInteraction);
    const activeInteraction: Interaction = useSelector(selectors.activeInteraction);

    const addNote = async (note: Note): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_NOTE,
            payload: note,
        } as InspectionsApplicationActionTypes);
    };

    const deleteNote = async (noteId: number): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.ACTIVE_INTERACTION_DELETE_NOTE,
            payload: noteId,
        } as InspectionsApplicationActionTypes);
    };

    const updateNote = async (note: Note): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.ACTIVE_INTERACTION_UPDATE_NOTE,
            payload: note,
        } as InspectionsApplicationActionTypes);
    };

    const addPhoto = async (photo: Photo): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_PHOTO,
            payload: photo,
        } as InspectionsApplicationActionTypes);
    };

    const setOccupant = async (occupantId: number): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.ACTIVE_INTERACTION_SET_OCCUPANT,
            payload: occupantId,
        } as InspectionsApplicationActionTypes);
    };

    const resetActiveInteraction = async (): Promise<void> => {
        dispatch({
            type: InspectionsApplicationActions.RESET_ACTIVE_INTERACTION,
        } as InspectionsApplicationActionTypes);
    };

    const completeActiveInteraction = async (): Promise<void> => {

        if (activeInteraction.notes.some((n: Note) => n.note === undefined || n.note.length === 0)
            || activeInteraction.photos.some((p: Photo) => p.file === undefined || p.file.size === 0)) {
            throw new Error('Unable to complete interaction due to invalid notes or photos.');
        }

        await addInteraction(activeInteraction);

        await resetActiveInteraction();
    };

    return {
        hasActiveInteraction,
        activeInteraction,
        setOccupant,
        addNote,
        deleteNote,
        updateNote,
        addPhoto,
        completeActiveInteraction,
        resetActiveInteraction,
    };
};

export default useActiveInteractionFromState;
