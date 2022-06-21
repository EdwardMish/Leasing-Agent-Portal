import { Note } from '../../Notes';
import { SalesSubmittalStatus } from '../../Sales';

export type GetSalesResponse = {
    comments: Note[];
    year: number;
    salesAmount: number;
    status: SalesSubmittalStatus;
    submittedBy: string;
    lastModifiedBy: string;
    month?: number;
}[];
