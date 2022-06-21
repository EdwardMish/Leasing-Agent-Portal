import { UserPermissions } from '../../../Types';
import { Occupant } from './Occupant';

export interface TenantUser {
    businessMarketingName: string;
    occupants: Occupant[];
    permissions: UserPermissions[];
}
