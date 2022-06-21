import { DirectoryState } from './Types'

import { DirectoryActionTypes, DirectoryActions } from './actions'
import { LoadStatus } from '../../Types';

export const initialState: DirectoryState = {
    properties: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: []
    }
}

export function directoryReducer(state: DirectoryState = initialState, action: DirectoryActionTypes): DirectoryState {

    switch (action.type) {
        case DirectoryActions.LOAD_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case DirectoryActions.SET_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {}),
                    sortOrder: action.payload.map((property) => property.id),
                }
            }
        case DirectoryActions.SET_PROPERTIES_ERROR_STATE:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.ERROR,
                    errorState: !!(action.payload.secondaryMessage)
                        ? {
                            error: action.payload.errorMessage,
                            secondaryMessage: action.payload.secondaryMessage
                        }
                        : { error: action.payload.errorMessage },
                    sortOrder: [],
                },
            }
        default:
            return state;
    }
}