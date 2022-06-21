import { LoadStatus } from '../AsyncState';

export interface StateRecord<T> {
    loadStatus: LoadStatus;
    errorState?: {
        error: string;
        secondaryMessage?: string;
    };
    sortOrder?: Array<string | number>;
    [index: number]: T;
}
