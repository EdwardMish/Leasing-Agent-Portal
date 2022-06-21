import { Space } from '../../Shared/Types/Space';
import { BaseUser } from './BaseUser';

import { OccupantAddress } from '../../Shared/Types/OccupantAddress';

export interface Occupant {
    collectSalesStartDate: string;
    id: number;
    leaseEnd: string;
    leaseStart: string;
    mailingAddress: OccupantAddress;
    marketingName: string;
    phone: string;
    physicalAddress: OccupantAddress;
    propertyId: number;
    propertyName: string;
    salesSubmissionFrequency: string;
    setup: string;
    spaces: Space[];
    users: BaseUser[];
}