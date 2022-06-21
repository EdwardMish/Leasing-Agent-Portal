import { Property } from '../Shared/Types'

export enum PropertyActions {
    LOAD_PROPERTIES = 'PROPERTIES_LOAD_PROPERTIES',
    SET_PROPERTIES = 'PROPERTIES_SET_PROPERTIES',
    SET_PROPERTIES_ERROR_STATE = 'PROPERTIES_SET_PROPERTIES_ERROR_STATE',
    SET_PROPERTY_OCCUPANTS = 'PROPERTIES_SET_PROPERTY_OCCUPANTS',
    SET_PROPERTY_SPACES = 'PROPERTIES_SET_PROPERTY_SPACES',
}

interface LoadPropertyPropertiesAction {
    type: typeof PropertyActions.LOAD_PROPERTIES;
}

interface SetPropertiesAction {
    type: typeof PropertyActions.SET_PROPERTIES;
    payload: Property[];
}

interface SetPropertiesErrorStateAction {
    type: typeof PropertyActions.SET_PROPERTIES_ERROR_STATE;
    payload: {
        errorMessage: string;
        secondaryMessage?: string;
    }
}

interface SetPropertyOccupantsAction {
    type: typeof PropertyActions.SET_PROPERTY_OCCUPANTS,
    payload: {
        propertyId: number | string;
        occupants: number[];
    }
}

interface SetPropertySpacesAction {
    type: typeof PropertyActions.SET_PROPERTY_SPACES,
    payload: {
        propertyId: number | string;
        spaces: number[];
    }
}

export type PropertyActionTypes =
    LoadPropertyPropertiesAction
    | SetPropertiesAction
    | SetPropertiesErrorStateAction
    | SetPropertyOccupantsAction
    | SetPropertySpacesAction