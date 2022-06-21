import { Role } from './Role';

export interface OwnerOperator {
    roles: Role[];
    properties: number[];
    occupants: number[];
}
