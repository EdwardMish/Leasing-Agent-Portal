import { LoadStatus } from '../../Types/AsyncState/LoadStatus';

import { LocationsState } from './Types/LocationsState';
import { LocationsActionTypes, LocationsActions } from './actions';

export const initialState: LocationsState = {
    inspections: {},
    inspectionSummaries: {},
    properties: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: [],
    },
    occupants: {},
    spaces: {},
    spaceOccupants: {},
};

export function locationsReducer(state: LocationsState = initialState, action: LocationsActionTypes): LocationsState {
    switch (action.type) {
        case LocationsActions.LOAD_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.PENDING,
                    sortOrder: [],
                },
            };
        case LocationsActions.SET_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.LOADED,
                    sortOrder: action.payload.map(({ id }) => id),
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr,
                    }), {}),
                },
            };
        case LocationsActions.SET_PROPERTIES_ERROR_STATE:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.ERROR,
                    sortOrder: [],
                    errorState: action.payload.secondaryMessage
                        ? {
                            error: action.payload.errorMessage,
                            secondaryMessage: action.payload.secondaryMessage,
                        }
                        : { error: action.payload.errorMessage },
                },
            };
        case LocationsActions.ADD_SPACES:
            return {
                ...state,
                spaces: {
                    ...state.spaces,
                    [action.payload.propertyId]: {
                        loadStatus: LoadStatus.LOADED,
                        sortOrder: action.payload.spaces.map(({ id }) => id),
                        ...action.payload.spaces.reduce((agg, curr) => ({
                            ...agg,
                            [curr.id]: curr,
                        }), {}),
                    },
                },
            };
        case LocationsActions.ADD_SPACE_OCCUPANTS:
            return {
                ...state,
                spaceOccupants: {
                    ...state.spaceOccupants,
                    [action.payload.spaceId]: action.payload.occupants,
                },
            };
        case LocationsActions.ADD_OCCUPANT_DETAILS:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload.id]: action.payload,
                },
            };
        case LocationsActions.ADD_INSPECTION:
            return {
                ...state,
                inspections: {
                    ...state.inspections,
                    [action.payload.id]: action.payload,
                }
            }
        case LocationsActions.ADD_INSPECTION_SUMMARIES:
            return {
                ...state,
                inspectionSummaries: {
                    ...state.inspectionSummaries,
                    [action.payload.propertyId]: action.payload.inspectionSummaries,
                }
            }
        default:
            return state;
    }
}
