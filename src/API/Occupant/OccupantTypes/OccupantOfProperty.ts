import { Spaces } from 'State';

export interface OccupantOfProperty {
    isMyTenantOccupant: boolean;
    collectSalesStart: string;
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
}
