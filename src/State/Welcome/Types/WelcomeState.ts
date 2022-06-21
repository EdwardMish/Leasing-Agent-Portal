import { OccupantCompliance } from '../../../API/Compliance/Types';
import { StateRecord } from '../../../Types';
import { Occupant } from './Occupant';
import { TenantUser } from './TenantUser';

export interface WelcomeState {
    occupants: StateRecord<Occupant>;
    occupantUsers: Record<number, Record<number, TenantUser>>;
    occupantCompliance: Record<number, OccupantCompliance[]>;
}