import { DocumentState } from './Types'

import { DocumentActionTypes, DocumentActions } from './actions'
import { LoadStatus } from '../../Types';

export const initialState: DocumentState = {
    properties: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: []
    }
}

export function documentsReducer(state: DocumentState = initialState, action: DocumentActionTypes): DocumentState {

    switch (action.type) {
        case DocumentActions.LOAD_PROPERTIES:
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case DocumentActions.SET_PROPERTIES:
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
        case DocumentActions.SET_PROPERTIES_ERROR_STATE:
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