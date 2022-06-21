import * as TasksAPI from 'API/Tasks/TasksAPI';
import {
    ComplianceItemNeedsApprovedTaskData,
    RequestStillOpenTaskData,
    SalesNeedApprovedTaskData,
    SubscribeToAlertsTaskData,
    Task as APITask,
} from 'API/Tasks/TasksTypes';
import { addDays } from 'date-fns';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import { LoadStatus } from '../../../Types';
import { correctCamelCaseWord } from '../../../utils';
import { TasksActions, TasksActionTypes } from '../actions';
import * as selectors from '../selectors';
import { Task, TaskType } from '../Types';
import { SubscribeToAlertsTask } from '../Types/SubscribeToAlertsTask';

type TasksStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    tasksCount: number;
    allTasks: Task[];
    requiredTasks: Task[];
    importantTasks: Task[];
    pauseTask: (task: Task) => Promise<void>;
    dismissTask: (task: Task) => Promise<void>;
};

const useTasksFromTasksState: TasksStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.tasksLoadStatus);

    const tasksCount: number = useSelector(selectors.tasksCount);

    const allTasks: Task[] = useSelector(selectors.allTasks);

    const requiredTasks: Task[] = useSelector(selectors.requiredTasks);

    const importantTasks: Task[] = useSelector(selectors.importantTasks);

    const mapTasks = (t: APITask[]): Task[] =>
        t.map((_) => {
            switch (_.type) {
                case TaskType.RequestStillOpen: {
                    const taskData = _.data as RequestStillOpenTaskData;

                    return {
                        id: _.id,
                        type: _.type,
                        priority: _.priority,
                        daysOpen: _.daysOpen,
                        title: `Request ${taskData.requestId} Needs Completed`,
                        visited: false,
                        link: `/requests/details/${taskData.requestId}`,
                        linkDisplay: 'View Request Details',
                    };
                }
                case TaskType.SalesNeedApproved: {
                    const taskData = _.data as SalesNeedApprovedTaskData;

                    return {
                        id: _.id,
                        type: _.type,
                        priority: _.priority,
                        daysOpen: _.daysOpen,
                        title: `Sales Submission Needs Reviewed for ${taskData.occupantName} @ ${taskData.propertyName}`,
                        visited: false,
                        link: `/locations/${taskData.propertyId}/occupants/${taskData.occupantId}/sales`,
                        linkDisplay: 'View Neighbor Sales Submissions',
                    };
                }
                case TaskType.SubscribeToAlerts: {
                    const taskData = _.data as SubscribeToAlertsTaskData;

                    return {
                        id: _.id,
                        type: _.type,
                        priority: _.priority,
                        daysOpen: _.daysOpen,
                        title: 'Subscribe to the Emergency Alert System',
                        subtitle: 'Receive notices of critical safety or well-being alerts right on your phone.',
                        visited: false,
                        link: '/account',
                        linkDisplay: 'View Your Account',
                        mobilePhone: taskData.mobilePhone,
                    } as SubscribeToAlertsTask;
                }
                case TaskType.CertificateOfInsuranceNeedsApproved:
                case TaskType.PlansNeedsApproved:
                case TaskType.PermitsNeedsApproved:
                case TaskType.SignageNeedsApproved: {
                    const taskData = _.data as ComplianceItemNeedsApprovedTaskData;

                    return {
                        id: _.id,
                        type: _.type,
                        priority: _.priority,
                        daysOpen: _.daysOpen,
                        title: `${correctCamelCaseWord(_.type)} compliance submission needs reviewed`,
                        visited: false,
                        link: `/locations/${taskData.propertyId}/occupants/${taskData.occupantId}/compliance`,
                        linkDisplay: 'View Neighbor Compliance',
                    };
                }
                case TaskType.CompleteLeasingApplication: {
                    return {
                        id: _.id,
                        type: _.type,
                        priority: _.priority,
                        daysOpen: _.daysOpen,
                        title: `You have an active Lease Application that needs completed.  Click here to continue.`,
                        visited: false,
                        link: `/app/lease-application`,
                        linkDisplay: 'Continue Leasing Application',
                    };
                }
                default:
                    throw new Error('Unsupported task type');
            }
        });

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE || loadState === LoadStatus.ERROR) {
            dispatch({
                type: TasksActions.LOAD_TASKS,
            } as TasksActionTypes);

            TasksAPI.getTasks().then((tasks) => {
                dispatch({
                    type: TasksActions.ADD_TASKS,
                    payload: mapTasks(tasks),
                } as TasksActionTypes);
            });

            dispatch(() => {
                setInterval(() => {
                    TasksAPI.getTasks().then((tasks) => {
                        dispatch({
                            type: TasksActions.ADD_TASKS,
                            payload: mapTasks(tasks),
                        } as TasksActionTypes);
                    });
                }, 5 * 60 * 1000); // Every 5 minutes
            });
        }
    }, [loadState]);

    const pauseTask = async (task: Task): Promise<void> => {
        try {
            const pauseUntil = new Date(addDays(Date.now(), 7));

            await TasksAPI.pauseTask(task.id, task.type, pauseUntil);

            dispatch({
                type: TasksActions.PAUSE_TASK,
                payload: {
                    taskId: task.id,
                },
            });
        } catch (error) {
            dispatch(addErrorMessage('"Unable to pause the task at this time, please try again later"'));
        }
    };

    const dismissTask = async (task: Task): Promise<void> => {
        try {
            await TasksAPI.dismissTask(task.id, task.type);

            dispatch({
                type: TasksActions.REMOVE_TASK,
                payload: {
                    taskId: task.id,
                },
            });
        } catch (error) {
            dispatch(addErrorMessage('Unable to dismiss the task at this time, please try again later'));
        }
    };

    return {
        areLoaded: loadState === LoadStatus.LOADED,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
        tasksCount,
        allTasks,
        requiredTasks,
        importantTasks,
        pauseTask,
        dismissTask,
    };
};

export default useTasksFromTasksState;
