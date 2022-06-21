import { userIsTenant } from './userIsTenant';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserTypes } from '../../Types';

describe('userIsTenant', () => {
    it('should return true for a user with type Tenant', () => {
        const user: CurrentUser = { userType: UserTypes.Tenant } as unknown as CurrentUser;

        expect(userIsTenant(user)).toBe(true);
    });

    it('should return false for a user with type other than Tenant', () => {
        const ooUser: CurrentUser = { userType: UserTypes.OwnerOperator } as unknown as CurrentUser;
        const unknownUser: CurrentUser = { userType: UserTypes.Unknown } as unknown as CurrentUser;

        expect(userIsTenant(ooUser)).toBeFalsy();
        expect(userIsTenant(unknownUser)).toBeFalsy();
    });

    it('should handle undefined as first argument', () => {
        const user: CurrentUser = undefined as unknown as CurrentUser;

        expect(typeof userIsTenant(user)).toBe('boolean');
        expect(userIsTenant(user)).toBeFalsy();
    });

    it('should handle an empty object as first argument', () => {
        const user: CurrentUser = {} as unknown as CurrentUser;

        expect(typeof userIsTenant(user)).toBe('boolean');
        expect(userIsTenant(user)).toBeFalsy();
    });
});
