import { InspectionItem } from './InspectionItem';
import { InteractionItem } from './InteractionItem';
import { InspectionComment } from './InspectionComment';

export interface Inspection {
    id: number;
    propertyId: number;
    propertyName: string;
    createdDate: string;
    completedDate?: string;
    interactions: InteractionItem[];
    items: InspectionItem[];
    comments: InspectionComment[];
}
