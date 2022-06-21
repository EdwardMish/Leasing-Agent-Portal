import { ActiveLeaseApplication } from './ActiveLeaseApplication';
import { Occupant } from './Occupant';

export interface Tenant {
    occupants: Occupant[];
    activeLeaseApplication: ActiveLeaseApplication;
}
