import { CurrentUser } from './Types';

export enum CurrentUserActions {
    LOAD_CURRENT_USER = 'LOAD_CURRENT_USER',
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    UPDATE_CURRENT_USER_NAME = 'UPDATE_CURRENT_USER_NAME',
    UPDATE_CURRENT_USER_EMAIL = 'UPDATE_CURRENT_USER_EMAIL',
    ADD_CURRENT_USER_OCCUPANTS = 'ADD_CURRENT_USER_OCCUPANTS',
}

export interface LoadCurrentUserAction {
    type: typeof CurrentUserActions.LOAD_CURRENT_USER;
}

export interface SetCurrentUserAction {
    type: typeof CurrentUserActions.SET_CURRENT_USER;
    payload: CurrentUser;
}

export interface UpdateCurrentUserName {
    type: typeof CurrentUserActions.UPDATE_CURRENT_USER_NAME,
    payload: {
        firstName: string,
        lastName: string
    }
}

export interface UpdateCurrentUserEmail {
    type: typeof CurrentUserActions.UPDATE_CURRENT_USER_EMAIL,
    payload: string;
}

export interface AddCurrentUserOccupants {
    type: typeof CurrentUserActions.ADD_CURRENT_USER_OCCUPANTS;
    payload: number[];
}

export type CurrentUserActionTypes = LoadCurrentUserAction
    | SetCurrentUserAction
    | UpdateCurrentUserName
    | UpdateCurrentUserEmail
    | AddCurrentUserOccupants
