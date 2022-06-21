import { InspectionItem } from './InspectionItem';

export interface Photo extends InspectionItem {
    file?: File;
    interactionId?: number;
}
