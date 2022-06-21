import { CurrentUser } from '../../State/CurrentUser/Types';
import { Role } from '../../State/Shared/Types';

import { userIsOwnerOperatorAdmin } from './userIsOwnerOperatorAdmin';
import { userHasRoles } from './userHasRoles';

export const userIsOwnerOperatorAdminOrHasRoles = (user: CurrentUser, roles: Role[]): boolean => userIsOwnerOperatorAdmin(user) || userHasRoles(user, roles);
