// import { UsersAPI, Users } from '../../API'
import { UserRoles, UserTypes } from '../../Types';

// TODO: Retain for user changes
// type User = UsersAPI.User | Users.Types.User

export const mapUserTypeName = (user: any): string => {
    switch (user.userType) {
    case UserTypes.OwnerOperator:
        const roles = user.hasOwnProperty('ownerOperator')
            ? user.ownerOperator?.roles || []
            : user.roles || [];

        return roles.some((r) => r.id === UserRoles.OOAdmin)
            ? 'Owner/Operator Admin'
            : 'Owner/Operator';
    case UserTypes.Tenant:
        return 'Neighbor';
    default:
        return 'Unknown';
    }
};
