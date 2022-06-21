import { LoadStatus } from '../../../Types';
import { Task } from './Task';

export interface TasksState {
    loadStatus: LoadStatus;
    errorState?: {
        error: string;
        secondaryMessage?: string;
    };
    sortOrder?: Array<string | number>;
    tasks: Record<string | number, Task>;
}
