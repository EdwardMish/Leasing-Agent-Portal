import { OccupantAddress } from '../../Shared/Types/OccupantAddress';
import { Space } from '../../Shared/Types/Space';

export interface OccupantDetail {
    collectSalesStartDate: string;
    id: number
    leaseEnd: string;
    leaseStart: string;
    legalName: string;
    mailingAddress: OccupantAddress;
    marketingName: string;
    phone: string;
    physicalAddress: OccupantAddress;
    propertyId: number;
    propertyName: string;
    salesSubmissionFrequency: string;
    spaces: Space[];
}
