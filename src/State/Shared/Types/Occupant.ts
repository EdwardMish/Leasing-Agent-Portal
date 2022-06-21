import { UserPermissions } from '../../../Types'
import { Role } from './Role'

export interface Occupant {
    id: number;
    name: string;
    occupantId: number;
    permissions: UserPermissions[];
    propertyId: number;
    propertyName: string;
    roles: Role[];
    setup: string;
}