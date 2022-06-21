import { Spaces } from 'State';
import { OccupantAddress } from './OccupantAddress';

export interface Occupant {
    collectSalesStartDate: string;
    leaseEnd: string;
    leaseStart: string;
    spaces: Spaces.Types.Space[];
    salesSubmissionFrequency: string;
    id: number;
    propertyId: number;
    legalName: string;
    marketingName: string;
    phone: string;
    propertyName: string;
    physicalAddress: OccupantAddress;
    mailingAddress: OccupantAddress;
}
