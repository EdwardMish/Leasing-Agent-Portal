import { Note } from '../Notes';
import { SalesSubmittalStatus } from './SalesSubmittalStatus';

export interface SalesSubmittal {
    notes: Note[];
    year: number;
    salesAmount: number;
    status: SalesSubmittalStatus;
    submittedBy: string;
    lastModifiedBy: string;
    month?: number;
}
