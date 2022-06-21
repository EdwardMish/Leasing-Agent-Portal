import { Inspection } from '../../Inspections/Types/Inspection';

export interface LocationInspection extends Inspection {
    completedDate: string;
}