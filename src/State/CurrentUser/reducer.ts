import { LoadStatus } from '../../Types';

import { CurrentUserActions, CurrentUserActionTypes } from './actions';

import { CurrentUser, CurrentUserState } from './Types';

const initialState: CurrentUserState = {
    loadStatus: LoadStatus.INITIAL_STATE,
    currentUser: {} as CurrentUser,
};

export function currentUserReducer(state: CurrentUserState = initialState, action: CurrentUserActionTypes): CurrentUserState {
    switch (action.type) {
    case CurrentUserActions.LOAD_CURRENT_USER:
        return {
            ...state,
            loadStatus: LoadStatus.PENDING,
        };
    case CurrentUserActions.SET_CURRENT_USER:
        return {
            ...state,
            loadStatus: LoadStatus.LOADED,
            currentUser: action.payload,
        };
    case CurrentUserActions.UPDATE_CURRENT_USER_NAME:
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            },
        };
    case CurrentUserActions.UPDATE_CURRENT_USER_EMAIL:
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                email: action.payload,
            },
        };
    default:
        return state;
    }
}
