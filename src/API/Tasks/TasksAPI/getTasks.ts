import GET from 'API/utils/GET';
import { Task } from '../TasksTypes/Task';

const getTasks = (): Promise<Task[]> => GET.wrapper<Task[]>(`${API_ROOT}/tasks`);

export default getTasks;
