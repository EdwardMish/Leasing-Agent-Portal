import { DirectoryPropertyWithOccupants } from "./Types";

export enum DirectoryActions {
    LOAD_PROPERTIES = 'DIRECTORY_LOAD_PROPERTIES',
    SET_PROPERTIES = 'DIRECTORY_SET_PROPERTIES',
    SET_PROPERTIES_ERROR_STATE = 'DIRECTORY_SET_PROPERTIES_ERROR_STATE',
}

interface LoadPropertyPropertiesAction {
    type: typeof DirectoryActions.LOAD_PROPERTIES;
}

interface SetPropertiesAction {
    type: typeof DirectoryActions.SET_PROPERTIES;
    payload: DirectoryPropertyWithOccupants[];
}

interface SetPropertiesErrorStateAction {
    type: typeof DirectoryActions.SET_PROPERTIES_ERROR_STATE;
    payload: {
        errorMessage: string;
        secondaryMessage?: string;
    }
}
export type DirectoryActionTypes =
    LoadPropertyPropertiesAction
    | SetPropertiesAction
    | SetPropertiesErrorStateAction
