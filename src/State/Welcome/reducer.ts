import { LoadStatus } from '../../Types'

import { WelcomeActions, WelcomeActionTypes } from './actions'
import { WelcomeState } from './Types'

export const initialState: WelcomeState = {
    occupants: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: []
    },
    occupantUsers: {},
    occupantCompliance: {},
}

export function welcomeReducer(state: WelcomeState = initialState, action: WelcomeActionTypes): WelcomeState {
    switch (action.type) {
        case WelcomeActions.LOAD_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case WelcomeActions.ADD_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {}),
                    sortOrder: action.payload.map((occupant) => occupant.id),
                }
            }
        case WelcomeActions.UPDATE_OCCUPANT_MAILING_ADDRESS:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload.id]: {
                        ...state.occupants[action.payload.id],
                        mailingAddress: action.payload.address
                    }
                }
            }
        case WelcomeActions.ADD_OCCUPANT_USERS:
            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.id]: {
                        ...action.payload.users.reduce((agg, curr) => ({
                            ...agg,
                            [curr.id]: curr
                        }), {})
                    },
                }
            }
        case WelcomeActions.ADD_OCCUPANT_USER:
            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.id]: {
                        ...state.occupantUsers[action.payload.id],
                        [action.payload.user.id]: action.payload.user
                    }
                },
            }
        case WelcomeActions.ADD_OCCUPANT_USER_PERMISSIONS:

            const combinedArray = state.occupantUsers[action.payload.occupantId][action.payload.userId].permissions.concat(action.payload.permissions)
            const permissionsSet = new Set(combinedArray)

            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.occupantId]: {
                        ...state.occupantUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.occupantUsers[action.payload.occupantId][action.payload.userId],
                            permissions: [
                                ...Array.from(permissionsSet)
                            ]
                        }
                    }
                }
            }
        case WelcomeActions.REMOVE_OCCUPANT_USER_PERMISSIONS:
            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.occupantId]: {
                        ...state.occupantUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.occupantUsers[action.payload.occupantId][action.payload.userId],
                            permissions: [
                                ...state.occupantUsers[action.payload.occupantId][action.payload.userId].permissions.filter(_ => !action.payload.permissions.includes(_))
                            ]
                        }
                    }
                }
            }
        case WelcomeActions.ADD_OCCUPANT_COMPLIANCE:
            return {
                ...state,
                occupantCompliance: {
                    ...state.occupantCompliance,
                    [action.payload.occupantId]: action.payload.compliance
                }
            }
        case WelcomeActions.ADD_USER_ROLE:
            if (!(state.occupantUsers.hasOwnProperty(action.payload.occupantId))) return state

            if (!(state.occupantUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId))) return state

            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.occupantId]: {
                        ...state.occupantUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.occupantUsers[action.payload.occupantId][action.payload.userId],
                            roles: [
                                ...state.occupantUsers[action.payload.occupantId][action.payload.userId].roles,
                                action.payload.role
                            ].filter((role, index, self) => self.indexOf(role) === index)
                        }
                    }
                }
            }
        case WelcomeActions.REMOVE_USER_ROLE:
            if (!(state.occupantUsers.hasOwnProperty(action.payload.occupantId))) return state

            if (!(state.occupantUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId))) return state

            return {
                ...state,
                occupantUsers: {
                    ...state.occupantUsers,
                    [action.payload.occupantId]: {
                        ...state.occupantUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.occupantUsers[action.payload.occupantId][action.payload.userId],
                            roles: [
                                ...state.occupantUsers[action.payload.occupantId][action.payload.userId].roles,
                                action.payload.role
                            ]
                                .filter((role, index, self) => self.indexOf(role) === index)
                                .filter((role) => !(action.payload.role.id === role.id))
                        }
                    }
                }
            }
        case WelcomeActions.SET_OCCUPANT_SETUP_COMPLETE:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload]: {
                        ...state.occupants[action.payload],
                        setup: true
                    }
                }
            }
        default:
            return state;
    }
}