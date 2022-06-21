import { OccupantCompliance } from '../../API/Compliance/Types/OccupantCompliance';
import { UserPermissions } from '../../Types';
import { Role } from '../Shared/Types';
import { Occupant, OccupantAddress, TenantUser } from './Types';

export enum WelcomeActions {
    LOAD_OCCUPANTS = 'WELCOME_LOAD_OCCUPANTS',
    ADD_OCCUPANTS = 'WELCOME_ADD_OCCUPANTS',
    UPDATE_OCCUPANT_MAILING_ADDRESS = 'WELCOME_UPDATE_OCCUPANT_MAILING_ADDRESS',
    ADD_OCCUPANT_USERS = 'WELCOME_ADD_OCCUPANT_USERS',
    ADD_OCCUPANT_USER = 'WELCOME_ADD_OCCUPANT_USER',
    ADD_OCCUPANT_USER_PERMISSIONS = 'WELCOME_ADD_OCCUPANT_USER_PERMISSIONS',
    REMOVE_OCCUPANT_USER_PERMISSIONS = 'WELCOME_REMOVE_OCCUPANT_USER_PERMISSIONS',
    ADD_OCCUPANT_COMPLIANCE = 'WELCOME_ADD_OCCUPANT_COMPLIANCE',
    ADD_USER_ROLE = 'WELCOME_ADD_USER_ROLE',
    REMOVE_USER_ROLE = 'REMOVE_ADD_USER_ROLE',
    SET_OCCUPANT_SETUP_COMPLETE = 'WELCOME_SET_OCCUPANT_SETUP_COMPLETE',
}

interface LoadOccupantsAction {
    type: typeof WelcomeActions.LOAD_OCCUPANTS;
}

interface AddOccupantsAction {
    type: typeof WelcomeActions.ADD_OCCUPANTS;
    payload: Occupant[];
}

interface UpdateOccupantMailingAddressAction {
    type: typeof WelcomeActions.UPDATE_OCCUPANT_MAILING_ADDRESS;
    payload: {
        id: number,
        address: OccupantAddress
    };
}

interface AddOccupantUsers {
    type: typeof WelcomeActions.ADD_OCCUPANT_USERS,
    payload: {
        id: number;
        users: TenantUser[]
    }
}

interface AddOccupantUser {
    type: typeof WelcomeActions.ADD_OCCUPANT_USER,
    payload: {
        id: number;
        user: TenantUser
    }
}

interface AddOccupantUserPermissions {
    type: typeof WelcomeActions.ADD_OCCUPANT_USER_PERMISSIONS,
    payload: {
        occupantId: number;
        userId: number;
        permissions: UserPermissions[]
    }
}

interface RemoveOccupantUserPermissions {
    type: typeof WelcomeActions.REMOVE_OCCUPANT_USER_PERMISSIONS,
    payload: {
        occupantId: number;
        userId: number;
        permissions: UserPermissions[]
    }
}

interface AddOccupantComplianceAction {
    type: typeof WelcomeActions.ADD_OCCUPANT_COMPLIANCE,
    payload: {
        occupantId: number;
        compliance: OccupantCompliance[];
    }
}

interface AddUserRoleAction {
    type: typeof WelcomeActions.ADD_USER_ROLE,
    payload: {
        occupantId: number;
        userId: number | string;
        role: Role;
    }
}

interface RemoveUserRoleAction {
    type: typeof WelcomeActions.REMOVE_USER_ROLE,
    payload: {
        occupantId: number;
        userId: number | string;
        role: Role;
    }
}

interface SetOccupantSetupComplete {
    type: typeof WelcomeActions.SET_OCCUPANT_SETUP_COMPLETE,
    payload: number;
}

export type WelcomeActionTypes =
    AddOccupantsAction
    | LoadOccupantsAction
    | UpdateOccupantMailingAddressAction
    | AddOccupantUsers
    | AddOccupantUser
    | AddOccupantUserPermissions
    | RemoveOccupantUserPermissions
    | AddOccupantComplianceAction
    | AddUserRoleAction
    | RemoveUserRoleAction
    | SetOccupantSetupComplete