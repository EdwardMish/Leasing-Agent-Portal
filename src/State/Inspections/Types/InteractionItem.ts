import { InspectionItem } from './InspectionItem';

export interface InteractionItem {
    id: number;
    items: InspectionItem[];
    occupantId: number;
    occupantName: string;
    createdDate?: string;
}
