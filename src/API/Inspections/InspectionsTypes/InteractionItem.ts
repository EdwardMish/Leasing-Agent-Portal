import { InspectionItem } from './InspectionItem';

export interface InteractionItem {
    id: number;
    createdDate: string;
    occupantId: number;
    occupantName: string;
    items: InspectionItem[];
}
