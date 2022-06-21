import { Task } from "./Types";

export enum TasksActions {
    LOAD_TASKS = "TASKS_LOAD_TASKS",
    ADD_TASKS = "TASKS_ADD_TASKS",
    MARK_VISITED = "TASKS_MARK_VISITED",
    PAUSE_TASK = "TASKS_PAUSE_TASK",
    REMOVE_TASK = "TASKS_REMOVE_TASK",
}

interface LoadTasks {
    type: typeof TasksActions.LOAD_TASKS;
}

interface AddTasks {
    type: typeof TasksActions.ADD_TASKS;
    payload: Task[];
}

interface MarkVisited {
    type: typeof TasksActions.MARK_VISITED;
    payload: string | number;
}

interface PauseTask {
    type: typeof TasksActions.PAUSE_TASK;
    payload: {
        taskId: string | number;
    };
}

interface RemoveTask {
    type: typeof TasksActions.REMOVE_TASK;
    payload: {
        taskId: string | number;
    };
}

export type TasksActionTypes = LoadTasks | AddTasks | MarkVisited | PauseTask | RemoveTask;
