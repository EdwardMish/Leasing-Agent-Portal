import { UsersAPI } from '../../API';
import { User, UserRoles, UserTypes } from '../../Types';

import { mapUserTypeName } from './mapUserTypeName';

export const mapUsersResponseToUser = (user: UsersAPI.User): User => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isEnabled: user.enabled,
    notificationTypes: [],
    userType: user.userType,
    isOwnerOperatorAdmin: user.userType === UserTypes.OwnerOperator && user.roles.some((r) => r.id === UserRoles.OOAdmin),
    userTypeDisplay: mapUserTypeName(user),
    roles: user.roles,
});
