import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserPermissions } from '../../Types';
import { hasPermissions } from './hasPermissions';

export const userHasPermissions = (user: CurrentUser, permissions: UserPermissions[]): boolean => !!user
    &&
    !!user.tenant
    &&
    hasPermissions(user.tenant.permissions, permissions);
