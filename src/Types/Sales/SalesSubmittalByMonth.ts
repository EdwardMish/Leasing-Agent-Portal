import { SalesSubmittal } from './SalesSubmittal';

export interface SalesSubmittalByMonth {
    month: string;
    submittal?: SalesSubmittal;
}
