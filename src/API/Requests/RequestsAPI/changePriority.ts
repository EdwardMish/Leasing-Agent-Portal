import PATCH from 'API/utils/PATCH';
import { RequestPriority } from 'Types/Requests/RequestPriority';

const changePriority = (requestId: number | string, priority: RequestPriority, note: string): Promise<void> =>
    PATCH.wrapper<{ note: string; priority: RequestPriority }>(`${API_ROOT}/requests/${requestId}/reprioritize`, {
        note,
        priority,
    });

export default changePriority;
