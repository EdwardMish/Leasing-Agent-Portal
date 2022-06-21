import { LoadStatus } from '../../Types'

import { ContactState } from './Types/ContactState'
import { ContactActions, ContactActionTypes } from './actions'

export const initialState: ContactState = {
    occupants: {},
    properties: {},
    contactTypes: {
        loadStatus: LoadStatus.INITIAL_STATE
    },
    userContacts: {
        loadStatus: LoadStatus.INITIAL_STATE
    }
}

export function contactsReducer(state: ContactState = initialState, action: ContactActionTypes): ContactState {
    switch (action.type) {
        case ContactActions.ADD_OCCUPANT_CONTACTS:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload.occupantId]: action.payload.contacts
                }
            }
        case ContactActions.ADD_PROPERTY_CONTACTS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [action.payload.propertyId]: action.payload.contacts
                }
            }
        case ContactActions.LOAD_CONTACT_TYPES:
            return {
                ...state,
                contactTypes: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case ContactActions.SET_CONTACT_TYPES:
            return {
                ...state,
                contactTypes: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                }
            }
        case ContactActions.LOAD_USER_CONTACTS:
            return {
                ...state,
                userContacts: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case ContactActions.SET_USER_CONTACTS:
            return {
                ...state,
                userContacts: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                }
            }
        default:
            return state;
    }
}