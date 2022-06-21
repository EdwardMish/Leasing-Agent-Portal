import {
    LoadStatus,
    User,
    UsersState
} from '../../Types';

import {
    UserActionTypes,
    UserActions
} from './actions';

const initialState: UsersState = {
    loadStatus: LoadStatus.INITIAL_STATE,
    users: {},
    usersSearchList: [],
}

export function usersReducer(state: UsersState = initialState, action: UserActionTypes): UsersState {
    switch (action.type) {
        case UserActions.REFRESH_USERS:
            return {
                ...state,
                loadStatus: LoadStatus.INITIAL_STATE
            }
        case UserActions.LOAD_USERS:
            return {
                ...state,
                loadStatus: LoadStatus.PENDING
            }
        case UserActions.SET_USERS:
            return {
                ...state,
                loadStatus: LoadStatus.LOADED,
                users: action.payload.reduce((agg: { [userId: number]: User }, current: User) => ({
                    ...agg,
                    [current.id]: current
                }), {})
            }
        case UserActions.SEARCH_USERS:
            const suSearchTerm = action.payload.toLowerCase();

            if (!(!!suSearchTerm)) {
                return {
                    ...state,
                    usersSearchList: []
                }
            }

            const suUserIds = Object.values(state.users)
                .filter((u: User) => u.email.toLowerCase().includes(suSearchTerm))
                .map((u: User) => u.id);

            return {
                ...state,
                usersSearchList: suUserIds
            }
        case UserActions.DISABLE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload]: { ...state.users[action.payload], isEnabled: false }
                }
            }
        case UserActions.ENABLE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload]: { ...state.users[action.payload], isEnabled: true }
                }
            }
        case UserActions.UPDATE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.id]: action.payload
                }
            }
        case UserActions.UPDATE_NAME:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.userId]: {
                        ...state.users[action.payload.userId],
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName
                    }
                }
            }
        case UserActions.UPDATE_EMAIL:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.userId]: {
                        ...state.users[action.payload.userId],
                        email: action.payload.email
                    }
                }
            }
        case UserActions.ADD_ROLE:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.userId]: {
                        ...state.users[action.payload.userId],
                        roles: [
                            ...state.users[action.payload.userId].roles,
                            action.payload.role
                        ]
                    }
                }
            }
        case UserActions.REMOVE_ROLE:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.userId]: {
                        ...state.users[action.payload.userId],
                        roles: [
                            ...state.users[action.payload.userId].roles
                        ].filter(({ id }) => id !== action.payload.role.id)
                    }
                }
            }
        default:
            return state;
    }
}