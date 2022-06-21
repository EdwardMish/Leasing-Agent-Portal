import { LoadStatus } from '../../Types';

import { BusinessState } from './Types/BusinessState';
import { Occupant } from './Types/Occupant';

import { BusinessActions, BusinessActionTypes } from './actions';

const initialState: BusinessState = {
    occupants: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: [],
    },
    businessUsers: {},
};

export function businessReducer(state: BusinessState = initialState, action: BusinessActionTypes): BusinessState {
    switch (action.type) {
        case BusinessActions.LOAD_BUSINESS_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.PENDING,
                },
            };
        case BusinessActions.SET_BUSINESS_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.LOADED,
                    sortOrder: action.payload.map(({ id }: Occupant) => id),
                    ...action.payload.reduce(
                        (agg, curr: Occupant) => ({
                            ...agg,
                            [curr.id]: curr,
                        }),
                        {},
                    ),
                },
            };
        case BusinessActions.SET_BUSINESS_OCCUPANTS_ERROR_STATE:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.ERROR,
                    sortOrder: [],
                    errorState: !!action.payload.secondaryMessage
                        ? {
                              error: action.payload.errorMessage,
                              secondaryMessage: action.payload.secondaryMessage,
                          }
                        : { error: action.payload.errorMessage },
                },
            };
        case BusinessActions.UPDATE_BUSINESS_OCCUPANT_MAILING_ADDRESS:
            if (!state.occupants.hasOwnProperty(action.payload.occupantId)) return state;

            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload.occupantId]: {
                        ...state.occupants[action.payload.occupantId],
                        mailingAddress: action.payload.address,
                    },
                },
            };
        case BusinessActions.LOAD_BUSINESS_USERS_FOR_OCCUPANT:
            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload]: {
                        loadStatus: LoadStatus.PENDING,
                        sortOrder: [],
                    },
                },
            };
        case BusinessActions.SET_BUSINESS_USERS_FOR_OCCUPANT:
            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        loadStatus: LoadStatus.LOADED,
                        sortOrder: action.payload.users.map(({ id }) => id),
                        ...action.payload.users.reduce(
                            (agg, curr) => ({
                                ...agg,
                                [curr.id]: curr,
                            }),
                            {},
                        ),
                    },
                },
            };
        case BusinessActions.ADD_BUSINESS_USER_PERMISSIONS:
            if (!state.businessUsers.hasOwnProperty(action.payload.occupantId)) return state;

            if (!state.businessUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId)) return state;

            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        ...state.businessUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.businessUsers[action.payload.occupantId][action.payload.userId],
                            permissions: [
                                ...state.businessUsers[action.payload.occupantId][action.payload.userId].permissions,
                                ...action.payload.permissions,
                            ].filter((permission, index, self) => self.indexOf(permission) === index),
                        },
                    },
                },
            };
        case BusinessActions.REMOVE_BUSINESS_USER_PERMISSIONS:
            if (!state.businessUsers.hasOwnProperty(action.payload.occupantId)) return state;

            if (!state.businessUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId)) return state;

            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        ...state.businessUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.businessUsers[action.payload.occupantId][action.payload.userId],
                            permissions: [
                                ...state.businessUsers[action.payload.occupantId][action.payload.userId].permissions,
                                ...action.payload.permissions,
                            ]
                                .filter((permission, index, self) => self.indexOf(permission) === index)
                                .filter((permission) => !action.payload.permissions.includes(permission)),
                        },
                    },
                },
            };
        case BusinessActions.ADD_BUSINESS_USER_ROLE:
            if (!state.businessUsers.hasOwnProperty(action.payload.occupantId)) return state;

            if (!state.businessUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId)) return state;

            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        ...state.businessUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.businessUsers[action.payload.occupantId][action.payload.userId],
                            roles: [
                                ...state.businessUsers[action.payload.occupantId][action.payload.userId].roles,
                                action.payload.role,
                            ].filter((role, index, self) => self.indexOf(role) === index),
                        },
                    },
                },
            };
        case BusinessActions.REMOVE_BUSINESS_USER_ROLE:
            if (!state.businessUsers.hasOwnProperty(action.payload.occupantId)) return state;

            if (!state.businessUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId)) return state;

            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        ...state.businessUsers[action.payload.occupantId],
                        [action.payload.userId]: {
                            ...state.businessUsers[action.payload.occupantId][action.payload.userId],
                            roles: state.businessUsers[action.payload.occupantId][action.payload.userId].roles.filter(
                                (role) => role.id !== action.payload.role.id,
                            ),
                        },
                    },
                },
            };
        case BusinessActions.REMOVE_BUSINESS_USER:
            if (!state.businessUsers.hasOwnProperty(action.payload.occupantId)) return state;

            if (!state.businessUsers[action.payload.occupantId].hasOwnProperty(action.payload.userId)) return state;

            const { [action.payload.userId]: rbuTemp, ...rbuTempUsers } = state.businessUsers[action.payload.occupantId];

            return {
                ...state,
                businessUsers: {
                    ...state.businessUsers,
                    [action.payload.occupantId]: {
                        ...rbuTempUsers,
                        sortOrder:
                            state.businessUsers[action.payload.occupantId].sortOrder?.filter((i) => rbuTemp.id !== i) || [],
                    },
                },
            };
        default:
            return {
                ...state,
            };
    }
}

