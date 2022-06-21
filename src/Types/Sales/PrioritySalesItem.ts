import { SalesItemPriority } from './SalesItemPriority';

export interface PrioritySalesItem {
    occupantId: number;
    occupantName: string;
    propertyName: string;
    month: number;
    year: number;
    dueDate: string;
    submissionPriority: SalesItemPriority;
}
