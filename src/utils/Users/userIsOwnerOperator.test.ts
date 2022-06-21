import { userIsOwnerOperator } from './userIsOwnerOperator';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserTypes } from '../../Types';

describe('userIsOwnerOperator', () => {
    it('should return true for a user with type OO', () => {
        const user: CurrentUser = { userType: UserTypes.OwnerOperator } as unknown as CurrentUser;

        expect(userIsOwnerOperator(user)).toBeTruthy();
    });

    it('should return false for a user with type other than OO', () => {
        const tenantUser: CurrentUser = { userType: UserTypes.Tenant } as unknown as CurrentUser;
        const unknownUser: CurrentUser = { userType: UserTypes.Unknown } as unknown as CurrentUser;

        expect(userIsOwnerOperator(tenantUser)).toBeFalsy();
        expect(userIsOwnerOperator(unknownUser)).toBeFalsy();
    });

    it('should handle undefined as first argument', () => {
        const user: CurrentUser = undefined as unknown as CurrentUser;

        expect(typeof userIsOwnerOperator(user)).toBe('boolean');
        expect(userIsOwnerOperator(user)).toBeFalsy();
    });

    it('should handle an empty object as first argument', () => {
        const user: CurrentUser = {} as unknown as CurrentUser;

        expect(typeof userIsOwnerOperator(user)).toBe('boolean');
        expect(userIsOwnerOperator(user)).toBeFalsy();
    });
});
