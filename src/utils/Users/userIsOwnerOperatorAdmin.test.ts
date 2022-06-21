import { userIsOwnerOperatorAdmin } from './userIsOwnerOperatorAdmin';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserRoles, UserTypes } from '../../Types';
import { UserRolesDisplayName } from '../../Types/User/UserRoles';

describe('userIsOwnerOperatorAdmin', () => {
    it('should return true when user is type OO with admin Role', () => {
        const user: CurrentUser = {
            userType: UserTypes.OwnerOperator,
            ownerOperator: {
                roles: [{ id: UserRoles.OOAdmin, name: UserRolesDisplayName[UserRoles.OOAdmin] }],
            }
        } as unknown as CurrentUser;

        expect(userIsOwnerOperatorAdmin(user)).toBeTruthy();
    });

    it('should return false when user does not have admin role', () => {
        const user: CurrentUser = {
            userType: UserTypes.OwnerOperator,
            ownerOperator: {
                roles: [],
            }
        } as unknown as CurrentUser;

        expect(userIsOwnerOperatorAdmin(user)).toBeFalsy();
    });

    it('should return false when user is not type OO', () => {
        const tenantUser: CurrentUser = { userType: UserTypes.Tenant } as unknown as CurrentUser;
        const unknownUser: CurrentUser = { userType: UserTypes.Unknown } as unknown as CurrentUser;

        expect(userIsOwnerOperatorAdmin(tenantUser)).toBeFalsy();
        expect(userIsOwnerOperatorAdmin(unknownUser)).toBeFalsy();
    });

    it('should handle undefined as first argument', () => {
        const user: CurrentUser = undefined as unknown as CurrentUser;

        expect(typeof userIsOwnerOperatorAdmin(user)).toBe('boolean');
        expect(userIsOwnerOperatorAdmin(user)).toBeFalsy();
    });

    it('should handle an empty object as first argument', () => {
        const user: CurrentUser = {} as unknown as CurrentUser;

        expect(typeof userIsOwnerOperatorAdmin(user)).toBe('boolean');
        expect(userIsOwnerOperatorAdmin(user)).toBeFalsy();
    });

    it('should handle a user with no type property', () => {
        const user: CurrentUser = {
            ownerOperator: {
                roles: [{ id: UserRoles.OOAdmin, name: UserRolesDisplayName[UserRoles.OOAdmin] }],
            }
        } as unknown as CurrentUser;

        expect(typeof userIsOwnerOperatorAdmin(user)).toBe('boolean');
        expect(userIsOwnerOperatorAdmin(user)).toBeFalsy();
    });

    it('should handle a user with no roles property', () => {
        const user: CurrentUser = {
            userType: UserTypes.OwnerOperator,
        } as unknown as CurrentUser;

        expect(typeof userIsOwnerOperatorAdmin(user)).toBe('boolean');
        expect(userIsOwnerOperatorAdmin(user)).toBeFalsy();
    });
});
