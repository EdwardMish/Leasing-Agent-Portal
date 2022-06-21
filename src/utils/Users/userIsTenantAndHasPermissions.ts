import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserPermissions } from '../../Types';

import { userIsTenant } from './userIsTenant';
import { userHasPermissions } from './userHasPermissions';

export const userIsTenantAndHasPermissions = (user: CurrentUser, permissions: UserPermissions[]): boolean => userIsTenant(user) && userHasPermissions(user, permissions);
