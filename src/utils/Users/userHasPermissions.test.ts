import { userHasPermissions } from './userHasPermissions';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserPermissions } from '../../Types';

describe('userHasPermissions', () => {
    it('should return true when a user has supplied permission', () => {
        const permissions: UserPermissions[] = [UserPermissions.ViewDocuments];

        const user: CurrentUser = {
            tenant: {
                permissions
            }
        } as unknown as CurrentUser;

        expect(userHasPermissions(user, permissions)).toBeTruthy();
    });

    it('should return false when a user has no supplied permissions', () => {
        const user: CurrentUser = {
            tenant: {
                permissions: []
            }
        } as unknown as CurrentUser;

        expect(userHasPermissions(user, [UserPermissions.ViewDocuments])).toBeFalsy();
    });

    it('should handle multiple permissions on user', () => {
        const permissions: UserPermissions[] = [
            UserPermissions.AdministrateBusiness,
            UserPermissions.CreateUpdateRequests,
            UserPermissions.CreateUpdateUsers,
        ];

        const user: CurrentUser = {
            tenant: {
                permissions
            }
        } as unknown as CurrentUser;

        expect(userHasPermissions(user, permissions)).toBeTruthy();
    });

    it('should handle a single permission on user', () => {
        const permissions: UserPermissions[] = [
            UserPermissions.AdministrateBusiness,
            UserPermissions.CreateUpdateRequests,
            UserPermissions.CreateUpdateUsers,
        ];

        const user: CurrentUser = {
            tenant: {
                permissions: [UserPermissions.CreateUpdateRequests]
            }
        } as unknown as CurrentUser;

        expect(userHasPermissions(user, permissions)).toBeTruthy();
    });

    it('should handle an empty array as second argument', () => {
        const user: CurrentUser = {
            tenant: {
                permissions: [UserPermissions.SubmitSales]
            }
        } as unknown as CurrentUser;

        expect(userHasPermissions(user, [])).toBeFalsy();
    });

    it('should handle undefined as first argument', () => {
        const user: CurrentUser = undefined as unknown as CurrentUser;

        expect(typeof userHasPermissions(user, [])).toBe('boolean');
        expect(userHasPermissions(user, [])).toBeFalsy();
    });

    it('should handle an empty object as first argument', () => {
        const user: CurrentUser = {} as unknown as CurrentUser;

        expect(typeof userHasPermissions(user, [])).toBe('boolean');
        expect(userHasPermissions(user, [])).toBeFalsy();
    });
});
