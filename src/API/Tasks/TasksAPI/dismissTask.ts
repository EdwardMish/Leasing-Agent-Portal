import POST from 'API/utils/POST';
import TaskType from 'State/Tasks/Types/TaskType';

const dismissTask = (taskId: string | number, taskType: TaskType): Promise<void> =>
    POST.wrapper<{
        taskType: TaskType;
    }>(`${API_ROOT}/tasks/${taskId}/dismiss`, {
        taskType,
    });

export default dismissTask;
