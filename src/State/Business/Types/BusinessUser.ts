import { BaseUser } from './BaseUser'
import { Role } from './Role'
import { UserPermissions } from '../../../Types/User/UserPermissions'

export interface BusinessUser extends BaseUser {
    permissions: UserPermissions[];
    email: string;
    businessPhone: string;
    mobilePhone: string;
    roles: Role[];
}