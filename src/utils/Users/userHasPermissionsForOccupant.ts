import { CurrentUser } from '../../State/CurrentUser/Types';
import { Occupant } from '../../State/Shared/Types';
import { UserPermissions } from '../../Types';

import { hasPermissions } from './hasPermissions';

export const userHasPermissionsForOccupant = (
    user: CurrentUser,
    permissions: UserPermissions[],
    occupantId: number | string
): boolean => {
    if (!(user) || !user.tenant) return false;

    const { permissions: occupantPermissions = [] }: Occupant = user.tenant?.occupants.find(({ occupantId: id }) => `${id}` === `${occupantId}`) || {} as Occupant;

    return hasPermissions(occupantPermissions, permissions);
};
