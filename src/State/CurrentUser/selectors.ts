import { createSelector } from "reselect";

import { CurrentUser, CurrentUserState } from "./Types";
import { UserRoles, UserRolesDisplayName } from "../../Types/User";
import { EmailTypes, Occupant, Role } from "../Shared/Types";

import {
    userHasPermissions,
    userHasPermissionsForOccupant,
    userHasRoles,
    userIsOwnerOperator,
    userIsOwnerOperatorAdmin,
    userIsTenant,
} from "../../utils/Users";

import { LoadStatus, State, UserTypes, UserPermissions } from "../../Types";

const currentUserFromState = ({ currentUser }: State): CurrentUserState => currentUser;

// Current User Load Status
export const currentUserLoadStatus = createSelector(
    currentUserFromState,
    ({ loadStatus }: CurrentUserState): LoadStatus => loadStatus,
);

export const currentUserIsLoaded = createSelector(
    currentUserLoadStatus,
    (loadStatus: LoadStatus): boolean => loadStatus === LoadStatus.LOADED,
);

// Current User
export const currentUser = createSelector(
    currentUserFromState,
    ({ currentUser }: CurrentUserState): CurrentUser => currentUser,
);

export const currentUserId = createSelector(currentUser, ({ id = 0 }: CurrentUser): number => id);

export const currentUserFullName = createSelector(
    currentUser,
    ({ firstName = "", lastName = "" }: CurrentUser): string => `${firstName} ${lastName}`,
);

export const currentUserBusinessMarketingName = createSelector(
    currentUser,
    ({ tenant }: CurrentUser): string => tenant?.businessMarketingName || "",
);

export const currentUserNotificationPreferences = createSelector(
    currentUser,
    ({ notificationTypes = [] }): EmailTypes[] => notificationTypes,
);

// User Roles
export const currentUserRoles = createSelector(
    currentUser,
    ({ ownerOperator }: CurrentUser): Role[] => ownerOperator?.roles || [],
);

export const currentUserHasRole = (role: Role) =>
    createSelector(currentUser, (currentUser): boolean => userHasRoles(currentUser, [role]));

export const currentUserHasRoles = (roles: Role[]) =>
    createSelector(currentUser, (currentUser): boolean => userHasRoles(currentUser, roles));

export const currentUserIsOOAdmin = createSelector(currentUserRoles, (roles: Role[]): boolean =>
    roles.some(
        (role) =>
            role.id === UserRoles.OOAdmin || role.name.includes(UserRolesDisplayName[UserRoles.OOAdmin]),
    ),
);

// User Permissions
export const currentUserPermissions = createSelector(
    currentUser,
    ({ tenant }: CurrentUser): UserPermissions[] => tenant?.permissions || [],
);

export const currentUserHasPermission = (permission: UserPermissions) =>
    createSelector(currentUser, (currentUser): boolean => userHasPermissions(currentUser, [permission]));

export const currentUserHasPermissionForOccupant = (
    permission: UserPermissions,
    occupantId: number | string,
) =>
    createSelector(currentUser, (currentUser): boolean =>
        userHasPermissionsForOccupant(currentUser, [permission], occupantId),
    );

export const currentUserHasPermissions = (permissions: UserPermissions[]) =>
    createSelector(currentUser, (currentUser): boolean => userHasPermissions(currentUser, permissions));

export const currentUserHasPermissionsForOccupant = (
    permissions: UserPermissions[],
    occupantId: number | string,
) =>
    createSelector(currentUser, (currentUser): boolean =>
        userHasPermissionsForOccupant(currentUser, permissions, occupantId),
    );

export const permissionsForOccupant = (occupantId: number | string) =>
    createSelector(currentUser, ({ tenant }): UserPermissions[] => {
        const { permissions = [] }: Occupant =
            tenant?.occupants.find(({ occupantId: id }) => `${id}` === `${occupantId}`) || ({} as Occupant);

        return permissions;
    });

// Current User Types
export const currentUserType = createSelector(
    currentUser,
    ({ userType = UserTypes.Unknown }: CurrentUser): UserTypes => userType,
);

export const currentUserIsOwnerOperatorAdmin = createSelector(currentUser, (currentUser): boolean =>
    userIsOwnerOperatorAdmin(currentUser),
);

export const currentUserIsOwnerOperator = createSelector(currentUser, (currentUser): boolean =>
    userIsOwnerOperator(currentUser),
);

export const currentUserIsTenant = createSelector(currentUser, (currentUser): boolean =>
    userIsTenant(currentUser),
);

// Current User Occupants
export const currentUserOccupants = createSelector(
    currentUser,
    ({ tenant }): Occupant[] => tenant?.occupants || [],
);

export const currentUserOccupantIds = createSelector(
    currentUser,
    ({ tenant }): number[] => tenant?.occupants.map(({ occupantId }) => occupantId) || [],
);

export const currentUserOccupantsWithIncompleteSetup = createSelector(
    currentUser,
    ({ tenant }): Occupant[] =>
        tenant?.occupants.filter(
            (_) => !_.setup && _.permissions.includes(UserPermissions.AdministrateBusiness),
        ) || [],
);
