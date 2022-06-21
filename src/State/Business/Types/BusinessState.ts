import { StateRecord } from '../../../Types'

import { BusinessUser } from './BusinessUser'
import { Occupant } from './Occupant'

type OccupantId = number;

export interface BusinessState {
    occupants: StateRecord<Occupant>;
    businessUsers: Record<OccupantId, StateRecord<BusinessUser>>;
}