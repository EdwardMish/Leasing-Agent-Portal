import { BaseUser } from 'State/Business/Types';
import { Space } from 'State/Shared/Types';
import { OccupantAddress } from './OccupantAddress';

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
