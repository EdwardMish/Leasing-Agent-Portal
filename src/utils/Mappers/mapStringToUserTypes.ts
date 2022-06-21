import { UserTypes } from '../../Types';

export const mapStringToUserTypes = (userType: string): UserTypes => {
    switch (userType.toLowerCase()) {
    case 'tenant':
        return UserTypes.Tenant;
        break;
    case 'owneroperator':
        return UserTypes.OwnerOperator;
        break;
    default:
        return UserTypes.Unknown;
    }
};
