import { CurrentUser } from '../../State/CurrentUser/Types';
import { Role } from '../../State/Shared/Types';

export const userHasRoles = (user: CurrentUser, roles: Role[]): boolean => !!user
    && !!user.ownerOperator
    && user.ownerOperator.roles.some((role) => roles.map(({ id }) => id).includes(role.id));
