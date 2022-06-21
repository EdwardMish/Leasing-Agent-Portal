import { CurrentUser } from '../../API';
import { CurrentUserState, Shared } from '../../State';
import { OwnerOperatorUser, Role, TenantUser } from '../../State/Shared/Types';
import { UserPermissions, UserTypes } from '../../Types';
import { mapStringToUserTypes } from './mapStringToUserTypes';

export const mapToCurrentUser = (user: CurrentUser.Types.User): CurrentUserState.Types.CurrentUser => {
    const { email, enabled, firstName, id, lastName, notificationTypes, ownerOperator, tenant, userType } = user;

    const type: UserTypes = mapStringToUserTypes(userType);

    const permissions: UserPermissions[] =
        !!tenant?.occupants && !!tenant.occupants.length
            ? tenant.occupants
                  .reduce((agg, curr) => [...agg, ...curr.permissions], [])
                  .filter((permission, index, self) => self.indexOf(permission) === index)
            : [];

    const roles: Role[] =
        !!tenant?.occupants && !!tenant.occupants.length
            ? tenant.occupants
                  .reduce((agg, curr) => [...agg, ...curr.roles], [])
                  .filter((role, index, self) => self.indexOf(role) === index)
            : ownerOperator?.roles || [];

    const businessMarketingName: string =
        !!user.tenant?.occupants && !!user.tenant.occupants.length ? user.tenant.occupants[0].name : '';

    const occupants: Shared.Types.Occupant[] =
        !!user.tenant?.occupants && !!user.tenant.occupants.length
            ? // TODO: Naming convention for 'id' vs 'OBJECTid'
              user.tenant.occupants.map((userOccupant) => ({
                  ...userOccupant,
                  id: userOccupant.occupantId,
              }))
            : [];

    return {
        id,
        firstName,
        lastName,
        email,
        enabled,
        userType: type,
        notificationTypes,
        ownerOperator:
            type === UserTypes.OwnerOperator && !!ownerOperator
                ? ({
                      propertyIds: ownerOperator.properties,
                      occupantIds: ownerOperator.occupants,
                      roles: roles,
                  } as OwnerOperatorUser)
                : null,
        tenant:
            type === UserTypes.Tenant && !!tenant
                ? ({
                      businessMarketingName: businessMarketingName,
                      permissions: permissions,
                      occupants: occupants,
                  } as TenantUser)
                : null,
    } as CurrentUserState.Types.CurrentUser;
};
