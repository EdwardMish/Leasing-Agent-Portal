import { BaseUser } from 'State/Business/Types/BaseUser';
import { UserPermissions } from 'Types/User/UserPermissions';
import { Role } from './Role';

export interface BusinessUser extends BaseUser {
    businessPhone: string;
    email: string;
    mobilePhone: string;
    permissions: UserPermissions[];
    roles: Role[];
}
