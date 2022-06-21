import PATCH from 'API/utils/PATCH';
import { StartWorkingResponse } from '../RequestsTypes/StartWorkingResponse';

const startWorking = (requestId: number): Promise<StartWorkingResponse> =>
    PATCH.patchWithResponse<void, StartWorkingResponse>(`${API_ROOT}/requests/${requestId}/start-working`, undefined);

export default startWorking;
