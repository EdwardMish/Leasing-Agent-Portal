import { OccupantAddress } from '../../../State/Shared/Types/OccupantAddress';
import { Space } from '../../../State/Shared/Types/Space';

export interface LocationsOccupantDetail {
    collectSalesStartDate: string;
    leaseEnd: string;
    leaseStart: string;
    spaces: Space[];
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
