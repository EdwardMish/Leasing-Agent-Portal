import { UserPermissions } from '../../Types/User/UserPermissions';
import { OccupantAddress } from '../../State/Shared/Types/OccupantAddress';

import { BusinessUser } from './Types/BusinessUser';
import { Occupant } from './Types/Occupant';
import { Role } from './Types/Role';

export enum BusinessActions {
    LOAD_BUSINESS_OCCUPANTS = 'LOAD_BUSINESS_OCCUPANTS',
    SET_BUSINESS_OCCUPANTS = 'SET_BUSINESS_OCCUPANTS',
    SET_BUSINESS_OCCUPANTS_ERROR_STATE = 'SET_BUSINESS_OCCUPANTS_ERROR_STATE',
    UPDATE_BUSINESS_OCCUPANT_MAILING_ADDRESS = 'UPDATE_BUSINESS_OCCUPANT_MAILING_ADDRESS',
    LOAD_BUSINESS_USERS_FOR_OCCUPANT = 'LOAD_BUSINESS_USERS_FOR_OCCUPANT',
    SET_BUSINESS_USERS_FOR_OCCUPANT = 'SET_BUSINESS_USERS_FOR_OCCUPANT',
    ADD_BUSINESS_USER_PERMISSIONS = 'ADD_BUSINESS_USER_PERMISSIONS',
    REMOVE_BUSINESS_USER_PERMISSIONS = 'REMOVE_BUSINESS_USER_PERMISSIONS',
    ADD_BUSINESS_USER_ROLE = 'ADD_BUSINESS_USER_ROLE',
    REMOVE_BUSINESS_USER_ROLE = 'REMOVE_BUSINESS_USER_ROLE',
    REMOVE_BUSINESS_USER = 'REMOVE_BUSINESS_USER',
}

type OccupantId = number;

interface LoadOccupantsAction {
    type: typeof BusinessActions.LOAD_BUSINESS_OCCUPANTS;
}

interface SetOccupantsAction {
    type: typeof BusinessActions.SET_BUSINESS_OCCUPANTS;
    payload: Occupant[];
}

interface SetOccupantsErrorStateAction {
    type: typeof BusinessActions.SET_BUSINESS_OCCUPANTS_ERROR_STATE;
    payload: {
        errorMessage: string;
        secondaryMessage?: string;
    }
}

interface UpdateMAilingAddressAction {
    type: typeof BusinessActions.UPDATE_BUSINESS_OCCUPANT_MAILING_ADDRESS,
    payload: {
        occupantId: OccupantId;
        address: OccupantAddress;
    }
}

interface LoadUsersForOccupantAction {
    type: typeof BusinessActions.LOAD_BUSINESS_USERS_FOR_OCCUPANT,
    payload: OccupantId;
}

interface SetUsersForOccupantAction {
    type: typeof BusinessActions.SET_BUSINESS_USERS_FOR_OCCUPANT,
    payload: {
        occupantId: OccupantId;
        users: BusinessUser[]
    }
}

interface AddUserPermissionsAction {
    type: typeof BusinessActions.ADD_BUSINESS_USER_PERMISSIONS,
    payload: {
        occupantId: OccupantId;
        userId: number | string;
        permissions: UserPermissions[];
    }
}

interface RemoveUserPermissionsAction {
    type: typeof BusinessActions.REMOVE_BUSINESS_USER_PERMISSIONS,
    payload: {
        occupantId: OccupantId;
        userId: number | string;
        permissions: UserPermissions[];
    }
}

interface AddUserRoleAction {
    type: typeof BusinessActions.ADD_BUSINESS_USER_ROLE,
    payload: {
        occupantId: OccupantId;
        userId: number | string;
        role: Role;
    }
}

interface RemoveUserRoleAction {
    type: typeof BusinessActions.REMOVE_BUSINESS_USER_ROLE,
    payload: {
        occupantId: OccupantId;
        userId: number | string;
        role: Role;
    }
}

interface RemoveUserAction {
    type: typeof BusinessActions.REMOVE_BUSINESS_USER,
    payload: {
        occupantId: OccupantId;
        userId: number;
    };
}

export type BusinessActionTypes = LoadOccupantsAction
    | SetOccupantsAction
    | SetOccupantsErrorStateAction
    | UpdateMAilingAddressAction
    | LoadUsersForOccupantAction
    | SetUsersForOccupantAction
    | AddUserPermissionsAction
    | RemoveUserPermissionsAction
    | AddUserRoleAction
    | RemoveUserRoleAction
    | RemoveUserAction