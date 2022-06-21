import { Occupant } from './Occupant';

export interface Property {
    propertyId: number;
    propertyName: string;
    inspectionDraftId?: number;
    occupants: Occupant[];
}
