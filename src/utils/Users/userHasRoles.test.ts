import { userHasRoles } from './userHasRoles';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { Role } from '../../State/Shared/Types';
import { UserRoles } from '../../Types';
import { UserRolesDisplayName } from '../../Types/User/UserRoles';

describe('userHasRoles', () => {
    it('should return true when a user has supplied role', () => {
        const roles: Role[] = [{
            id: UserRoles.OOAccounting,
            name: UserRolesDisplayName[UserRoles.OOAccounting],
        }];

        const user: CurrentUser = {
            ownerOperator: {
                roles
            }
        } as unknown as CurrentUser;

        expect(userHasRoles(user, roles)).toBeTruthy();
    });

    it('should return false when a user has no supplied roles', () => {
        const roles: Role[] = [{
            id: UserRoles.OOAccounting,
            name: UserRolesDisplayName[UserRoles.OOAccounting],
        }];

        const user: CurrentUser = {
            ownerOperator: {
                roles: []
            }
        } as unknown as CurrentUser;

        expect(userHasRoles(user, roles)).toBeFalsy();
    });

    it('should handle multiple roles on user', () => {
        const roles: Role[] = [
            { id: UserRoles.OOAccounting, name: UserRolesDisplayName[UserRoles.OOAccounting] },
            { id: UserRoles.OOLegal, name: UserRolesDisplayName[UserRoles.OOLegal] },
            { id: UserRoles.OOSalesCoordinator, name: UserRolesDisplayName[UserRoles.OOSalesCoordinator] },
        ];

        const user: CurrentUser = {
            ownerOperator: {
                roles
            }
        } as unknown as CurrentUser;

        expect(userHasRoles(user, roles)).toBeTruthy();
    });

    it('should handle a single role on user', () => {
        const roles: Role[] = [
            { id: UserRoles.OOAccounting, name: UserRolesDisplayName[UserRoles.OOAccounting] },
            { id: UserRoles.OOLegal, name: UserRolesDisplayName[UserRoles.OOLegal] },
            { id: UserRoles.OOSalesCoordinator, name: UserRolesDisplayName[UserRoles.OOSalesCoordinator] },
        ];

        const user: CurrentUser = {
            ownerOperator: {
                roles: [{ id: UserRoles.OOLegal, name: UserRolesDisplayName[UserRoles.OOLegal] }]
            }
        } as unknown as CurrentUser;

        expect(userHasRoles(user, roles)).toBeTruthy();
    });

    it('should handle an empty array as second argument', () => {
        const user: CurrentUser = {
            ownerOperator: {
                roles: [{ id: UserRoles.OOUtility, name: UserRolesDisplayName[UserRoles.OOUtility] }]
            }
        } as unknown as CurrentUser;

        expect(userHasRoles(user, [])).toBeFalsy();
    });

    it('should handle undefined as first argument', () => {
        const user: CurrentUser = undefined as unknown as CurrentUser;

        expect(typeof userHasRoles(user, [])).toBe('boolean');
        expect(userHasRoles(user, [])).toBeFalsy();
    });

    it('should handle an empty object as first argument', () => {
        const user: CurrentUser = {} as unknown as CurrentUser;

        expect(typeof userHasRoles(user, [])).toBe('boolean');
        expect(userHasRoles(user, [])).toBeFalsy();
    });
});
