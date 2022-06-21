import POST from 'API/utils/POST';
import TaskType from 'State/Tasks/Types/TaskType';

const pauseTask = (taskId: string | number, taskType: TaskType, until: Date): Promise<void> =>
    POST.wrapper<{
        taskType: TaskType;
        until: Date;
    }>(`${API_ROOT}/tasks/${taskId}/pause`, {
        taskType,
        until,
    });

export default pauseTask;
