import { Note } from '../../Types/Note';
import { Photo } from '../../Types/Photo';

import ActiveInspectionStatus from './ActiveInspectionStatus';
import { Interaction } from './Interaction';

export interface ActiveInspection {
    id: number;
    interactions: Record<number, Interaction>;
    activeInteraction: Interaction;
    notes: Record<number, Note>;
    pendingUploads: Photo[];
    photos: Record<number, Photo> & { sortOrder: number[] };
    propertyId: number;
    sortOrder: number[];
    status: ActiveInspectionStatus;
    uploading: boolean;
}
