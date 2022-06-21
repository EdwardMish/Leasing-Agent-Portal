import { PropertyState } from './Types'

import { PropertyActionTypes, PropertyActions } from './actions'
import { LoadStatus } from '../../Types';

export const initialState: PropertyState = {
    properties: {
        loadStatus: LoadStatus.INITIAL_STATE
    },
    sortOrder: [],
    propertyOccupants: {},
    propertySpaces: {},
}

export function propertiesReducer(state: PropertyState = initialState, action: PropertyActionTypes): PropertyState {
    switch (action.type) {
        case PropertyActions.LOAD_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case PropertyActions.SET_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                },
                sortOrder: action.payload.map((property) => property.id)
            }
        case PropertyActions.SET_PROPERTIES_ERROR_STATE:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.ERROR,
                    errorState: !!(action.payload.secondaryMessage)
                        ? {
                            error: action.payload.errorMessage,
                            secondaryMessage: action.payload.secondaryMessage
                        }
                        : { error: action.payload.errorMessage }
                },
                sortOrder: []
            }
        case PropertyActions.SET_PROPERTY_OCCUPANTS:
            return {
                ...state,
                propertyOccupants: {
                    ...state.propertyOccupants,
                    [action.payload.propertyId]: action.payload.occupants
                }
            }
        case PropertyActions.SET_PROPERTY_SPACES:
            return {
                ...state,
                propertySpaces: {
                    ...state.propertySpaces,
                    [action.payload.propertyId]: action.payload.spaces
                }
            }
        default:
            return state;
    }
}