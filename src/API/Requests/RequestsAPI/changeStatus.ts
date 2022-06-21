import PATCH from 'API/utils/PATCH';
import { RequestStatus } from 'Types/Requests/RequestStatus';

const changeStatus = (requestId: number | string, status: RequestStatus): Promise<void> =>
    PATCH.wrapper<{ status: RequestStatus }>(`${API_ROOT}/requests/${requestId}/change-status`, { status });

export default changeStatus;
