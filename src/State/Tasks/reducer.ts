import { LoadStatus } from '../../Types';
import { TasksActions, TasksActionTypes } from './actions';
import { TasksState } from './Types';

export const initialState: TasksState = {
    loadStatus: LoadStatus.INITIAL_STATE,
    sortOrder: [],
    tasks: {},
};

export function tasksReducer(state: TasksState = initialState, action: TasksActionTypes): TasksState {
    switch (action.type) {
        case TasksActions.LOAD_TASKS:
            return {
                ...state,
                loadStatus: LoadStatus.PENDING,
            };
        case TasksActions.ADD_TASKS:
            return {
                ...state,
                loadStatus: LoadStatus.LOADED,
                sortOrder: action.payload.sort((a, b) => a.daysOpen - b.daysOpen).map((task) => task.id),
                tasks: {
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr,
                    }), {}),
                },
            };
        case TasksActions.MARK_VISITED:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload]: {
                        ...state.tasks[action.payload],
                        visited: true
                    }
                }
            };
        case TasksActions.PAUSE_TASK:
        case TasksActions.REMOVE_TASK: {

            const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                [action.payload.taskId]: target,
                ...rest
            } = state.tasks;

            return {
                ...state,
                tasks: {
                    ...rest
                },
            };
        }
        default:
            return state;
    }
}
