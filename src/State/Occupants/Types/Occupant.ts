import { SalesSubmissionFrequency } from '../../../Types/Sales/SalesSubmissionFrequency'

export interface Occupant {
    canEdit: boolean;
    collectSalesStartDate: string;
    id: number;
    leaseEnd: string;
    leaseStart: string;
    name: string;
    phone: string;
    propertyId: number;
    propertyName: string;
    spaces: {
        id: number,
        name: string;
    }[];
    salesSubmissionFrequency: SalesSubmissionFrequency;
    shouldSubmitSales: boolean;
}