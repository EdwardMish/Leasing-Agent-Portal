import { Note } from '../Notes';

export interface PendingSalesSubmittal {
    occupantId: number;
    occupantName: string;
    propertyName: string;
    propertyId: number;
    month: number;
    notes: Note[];
    year: number;
    salesAmount: number;
    lastTwelveMonthsSalesAmountAverage: number | null;
    yearOverYearAverage: number | null;
    submittedBy: string;
    lastModifiedBy: string;
}
