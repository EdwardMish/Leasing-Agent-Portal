import TaskPriority from './TaskPriority';
import TaskType from './TaskType';

export interface Task {
    id: string | number;
    type: TaskType;
    priority: TaskPriority;
    daysOpen: number;
    title: string;
    subtitle?: string;
    link: string;
    linkDisplay?: string;
    visited: boolean;
}
