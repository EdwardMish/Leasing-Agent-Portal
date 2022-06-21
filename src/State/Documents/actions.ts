import { DocumentPropertyWithOccupants } from "./Types";

export enum DocumentActions {
    LOAD_PROPERTIES = 'DOCUMENT_LOAD_PROPERTIES',
    SET_PROPERTIES = 'DOCUMENT_SET_PROPERTIES',
    SET_PROPERTIES_ERROR_STATE = 'DOCUMENT_SET_PROPERTIES_ERROR_STATE',
}

interface LoadPropertyPropertiesAction {
    type: typeof DocumentActions.LOAD_PROPERTIES;
}

interface SetPropertiesAction {
    type: typeof DocumentActions.SET_PROPERTIES;
    payload: DocumentPropertyWithOccupants[];
}

interface SetPropertiesErrorStateAction {
    type: typeof DocumentActions.SET_PROPERTIES_ERROR_STATE;
    payload: {
        errorMessage: string;
        secondaryMessage?: string;
    }
}
export type DocumentActionTypes =
    LoadPropertyPropertiesAction
    | SetPropertiesAction
    | SetPropertiesErrorStateAction
