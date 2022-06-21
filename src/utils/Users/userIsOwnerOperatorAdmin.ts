import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserRoles } from '../../Types';
import { UserRolesDisplayName } from '../../Types/User/UserRoles';

import { userIsOwnerOperatorAndHasRoles } from './userIsOwnerOperatorAndHasRoles';

export const userIsOwnerOperatorAdmin = (
    user: CurrentUser
): boolean => userIsOwnerOperatorAndHasRoles(user, [{ id: UserRoles.OOAdmin, name: UserRolesDisplayName[UserRoles.OOAdmin] }]);
