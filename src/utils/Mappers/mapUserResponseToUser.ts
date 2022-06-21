import { Users } from '../../API';
import { Shared } from '../../State';
import { User, UserRoles, UserTypes } from '../../Types';
import { mapUserTypeName } from './mapUserTypeName';

export const mapUserResponseToUser = (user: Users.Types.User): User => {
    const {
        email,
        enabled,
        firstName,
        id,
        lastName,
        notificationTypes,
        ownerOperator,
        tenant,
        userType,
    } = user;

    const roles: Shared.Types.Role[] = ownerOperator
        ? ownerOperator.roles
        : tenant?.occupants
            .reduce((agg, curr) => [...agg, ...curr.roles], [])
            .filter((role, index, self) => self.indexOf(role) === index) || [];

    return {
        id,
        email,
        firstName,
        lastName,
        isEnabled: enabled,
        notificationTypes: notificationTypes || [],
        userType,
        isOwnerOperatorAdmin: userType === UserTypes.OwnerOperator && roles.some((r) => r.id === UserRoles.OOAdmin),
        userTypeDisplay: mapUserTypeName(user),
        roles,
    };
};
