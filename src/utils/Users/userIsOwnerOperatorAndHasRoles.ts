import { CurrentUser } from '../../State/CurrentUser/Types';
import { Role } from '../../State/Shared/Types';

import { userIsOwnerOperator } from './userIsOwnerOperator';
import { userHasRoles } from './userHasRoles';

export const userIsOwnerOperatorAndHasRoles = (user: CurrentUser, roles: Role[]): boolean => userIsOwnerOperator(user) && userHasRoles(user, roles);
