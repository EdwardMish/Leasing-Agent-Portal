import { User } from '../../Types'
import { Role } from '../Shared/Types/Role'

export enum UserActions {
    REFRESH_USERS = 'REFRESH_USERS',
    LOAD_USERS = 'LOAD_USERS',
    SET_USERS = 'SET_USERS',
    SEARCH_USERS = 'SEARCH_USERS',
    DISABLE_USER = 'DISABLE_USER',
    ENABLE_USER = 'ENABLE_USER',
    UPDATE_USER = 'UPDATE_USER',
    UPDATE_NAME = 'UPDATE_NAME',
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    ADD_ROLE = 'ADD_ROLE',
    REMOVE_ROLE = 'REMOVE_ROLE',
}

interface RefreshUsersAction {
    type: typeof UserActions.REFRESH_USERS;
}

interface LoadUsersAction {
    type: typeof UserActions.LOAD_USERS;
}

interface SetUsersAction {
    type: typeof UserActions.SET_USERS;
    payload: User[];
}

interface SearchUsersAction {
    type: typeof UserActions.SEARCH_USERS;
    payload: string;
}

interface DisableUserAction {
    type: typeof UserActions.DISABLE_USER;
    payload: number;
}

interface EnableUserAction {
    type: typeof UserActions.ENABLE_USER;
    payload: number;
}

interface UpdateUserAction {
    type: typeof UserActions.UPDATE_USER;
    payload: User;
}

interface UsersUpdateNameAction {
    type: typeof UserActions.UPDATE_NAME;
    payload: {
        userId: number;
        firstName: string;
        lastName: string;
    };
}

interface UsersUpdateEmailAction {
    type: typeof UserActions.UPDATE_EMAIL;
    payload: {
        userId: number;
        email: string;
    };
}

interface UsersAddRoleAction {
    type: typeof UserActions.ADD_ROLE;
    payload: {
        userId: number;
        role: Role;
    };
}

interface UsersRemoveRoleAction {
    type: typeof UserActions.REMOVE_ROLE;
    payload: {
        userId: number;
        role: Role;
    };
}

export type UserActionTypes = RefreshUsersAction
    | LoadUsersAction
    | SetUsersAction
    | SearchUsersAction
    | DisableUserAction
    | EnableUserAction
    | UpdateUserAction
    | UsersUpdateNameAction
    | UsersUpdateEmailAction
    | UsersAddRoleAction
    | UsersRemoveRoleAction;