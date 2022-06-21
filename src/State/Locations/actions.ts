import { PropertyWithOccupants } from '../Shared/Types/PropertyWithOccupants';
import { Space } from '../Shared/Types/Space';

import { LocationInspection } from './Types/LocationInspection';
import { LocationInspectionSummary } from './Types/LocationInspectionSummary';
import { OccupantDetail } from './Types/OccupantDetail';

export enum LocationsActions {
    LOAD_PROPERTIES = 'LOCATIONS_LOAD_PROPERTIES',
    SET_PROPERTIES = 'LOCATIONS_SET_PROPERTIES',
    SET_PROPERTIES_ERROR_STATE = 'LOCATIONS_SET_PROPERTIES_ERROR_STATE',
    ADD_SPACE = 'LOCATIONS_ADD_SPACE',
    ADD_SPACES = 'LOCATIONS_ADD_SPACES',
    ADD_SPACE_OCCUPANTS = 'LOCATIONS_ADD_SPACE_OCCUPANTS',
    ADD_OCCUPANT_DETAILS = 'ADD_OCCUPANT_DETAILS',
    ADD_INSPECTION = 'LOCATIONS_ADD_INSPECTION',
    ADD_INSPECTION_SUMMARIES = 'LOCATIONS_ADD_INSPECTION_SUMMARIES',
}

interface LoadPropertiesAction {
    type: typeof LocationsActions.LOAD_PROPERTIES;
}

interface SetPropertiesAction {
    type: typeof LocationsActions.SET_PROPERTIES;
    payload: PropertyWithOccupants[];
}

interface SetPropertiesErrorStateAction {
    type: typeof LocationsActions.SET_PROPERTIES_ERROR_STATE;
    payload: {
        errorMessage: string;
        secondaryMessage?: string;
    }
}

interface AddSpacesAction {
    type: typeof LocationsActions.ADD_SPACES;
    payload: {
        propertyId: number | string;
        spaces: Space[];
    }
}

interface AddSpaceOccupantsAction {
    type: typeof LocationsActions.ADD_SPACE_OCCUPANTS;
    payload: {
        spaceId: number | string;
        occupants: OccupantDetail[];
    }
}

interface AddOccupantDetailsAction {
    type: typeof LocationsActions.ADD_OCCUPANT_DETAILS;
    payload: OccupantDetail;
}

interface AddInspectionAction {
    type: typeof LocationsActions.ADD_INSPECTION;
    payload: LocationInspection;
}

interface AddInspectionSummariesAction {
    type: typeof LocationsActions.ADD_INSPECTION_SUMMARIES;
    payload: {
        propertyId: number | string;
        inspectionSummaries: LocationInspectionSummary[];
    }
}

export type LocationsActionTypes =
    LoadPropertiesAction
    | SetPropertiesAction
    | SetPropertiesErrorStateAction
    | AddSpacesAction
    | AddSpaceOccupantsAction
    | AddOccupantDetailsAction
    | AddInspectionAction
    | AddInspectionSummariesAction
