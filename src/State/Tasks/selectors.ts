import { createSelector } from 'reselect';
import { LoadStatus, State } from '../../Types';
import { Task, TaskPriority, TasksState } from './Types';

const tasksState = ({ tasks }: State) => tasks;

export const tasksSlice = createSelector(
    tasksState,
    ({ tasks }: TasksState): Record<string | number, Task> => tasks,
);

export const tasksLoadStatus = createSelector(
    tasksState,
    ({ loadStatus }): LoadStatus => loadStatus,
);

export const allTasks = createSelector(
    tasksSlice,
    (t: Record<string | number, Task>): Task[] => Object.values(t) || [],
);

export const requiredTasks = createSelector(
    tasksSlice,
    (t: Record<string | number, Task>): Task[] => Object.values(t).filter((t: Task) => t.priority === TaskPriority.Required) || [],
);

export const importantTasks = createSelector(
    tasksSlice,
    (t: Record<string | number, Task>): Task[] => Object.values(t).filter((t: Task) => t.priority === TaskPriority.Important) || [],
);

export const tasksCount = createSelector(
    allTasks,
    (t): number => t.length,
);
