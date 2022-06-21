export interface LeasingLeadListItem {
    id: number;
    name: string;
    details: string;
    created: string;
    completed: boolean;
    lastActivity: boolean;
    primaryContactId?: number;
    primaryContactName?: string;
    propertyId: number;
    propertyName: string;
}
