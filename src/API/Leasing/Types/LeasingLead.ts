import { Guarantor } from './Guarantor';

export enum LeasingLeadStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    COMPLETED = 'completed',
}

export interface LeasingLead {
    id: number;
    name: string;
    details: string;
    tag?: string;
    created: string;
    status: LeasingLeadStatus;
    lastActivity: boolean;
    primaryContactId?: number;
    primaryContactName?: string;
    propertyId: number;
    propertyName: string;
    spaceName: string;
    guarantors?: Guarantor[];
}
