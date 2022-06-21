import { UserPermissions, UserTypes } from '../../Types';
import { PagedResponse } from '../../Types/api-types/Shared/PagedResponse';
import { PagedSortedFilteredRequestParams } from '../Shared/PagedSortedFilteredRequest';
import { DELETE, GET, PATCH, POST } from '../utils';
import { Role } from './Types';

export namespace UsersAPI {
    export interface User {
        email: string;
        enabled: boolean;
        firstName: string;
        id: number;
        lastName: string;
        roles: Role[];
        userType: UserTypes;
    }

    type UserWithInvite = User & { hasAcceptedInvitation: boolean };

    export const getUsers = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<UserWithInvite>> =>
        GET.pagedResponse<UserWithInvite>(`${API_ROOT}/users`, params);

    export const deleteUserInvitation = (userId: number): Promise<void> =>
        DELETE.wrapper(`${API_ROOT}/users/${userId}/invitation`);

    export const resendUserInvitation = (userId: number): Promise<void> =>
        POST.wrapper(`${API_ROOT}/users/${userId}/resend-invitation`);

    export interface TenantRole {
        id: number;
        name: string;
    }

    export interface TenantUser {
        email: string;
        enabled: boolean;
        firstName: string;
        id: number;
        lastName: string;
        permissions: UserPermissions[];
        roles: TenantRole[];
    }

    export const getTenantUsersForOccupant = (occupantId: number): Promise<TenantUser[]> =>
        GET.wrapper<TenantUser[]>(`${API_ROOT}/occupants/${occupantId}/tenants`);

    export const removeOccupantAssociation = (occupantId: number | string, userId: number): Promise<void> =>
        PATCH.wrapper<{ occupantId: number | string }>(`${API_ROOT}/tenants/${userId}/remove-occupant-relationship`, {
            occupantId,
        });

    export const addPermissionsForTenantUser = (
        occupantId: number | string,
        userId: number,
        permissions: UserPermissions[],
    ): Promise<void> => PATCH.wrapper(`${API_ROOT}/tenants/${userId}/add-occupant-permission`, { occupantId, permissions });

    export const removePermissionsForTenantUser = (
        occupantId: number | string,
        userId: number,
        permissions: UserPermissions[],
    ): Promise<void> =>
        PATCH.wrapper(`${API_ROOT}/tenants/${userId}/remove-occupant-permission`, {
            occupantId,
            permissions,
        });

    export interface NewTenantUser {
        firstName: string;
        lastName: string;
        email: string;
        occupantId: number;
    }

    export const createTenant = (
        occupantId: number | string,
        firstName: string,
        lastName: string,
        email: string,
    ): Promise<{ userId: number }> =>
        POST.postWithResponse<NewTenantUser, { userId: number }>(`${API_ROOT}/tenants`, {
            firstName,
            lastName,
            email,
            occupantId: typeof occupantId === 'string' ? parseInt(occupantId) : occupantId,
        });

    export const getUserByEmail = (email: string): Promise<TenantUser> =>
        GET.wrapper<TenantUser>(`${API_ROOT}/tenants/${email}/details`);

    export interface UserInvitation {
        occupantId: number | string;
        userId: number;
    }

    export const inviteUserToOccupant = (invitation: UserInvitation) =>
        PATCH.wrapper(`${API_ROOT}/tenants/${invitation.userId}/invite`, invitation);
}

