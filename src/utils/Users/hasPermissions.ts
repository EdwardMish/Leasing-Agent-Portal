import { UserPermissions } from '../../Types';

export const hasPermissions = (
    currentPermissions: UserPermissions[],
    permissions: UserPermissions[]
): boolean => currentPermissions.some((role) => permissions.includes(role));
