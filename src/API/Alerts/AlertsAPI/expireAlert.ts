import { PATCH } from 'API/utils';

const expireAlert = (alertId: number): Promise<void> =>
    PATCH.wrapper<{
        alertId: number;
    }>(`${API_ROOT}/alerts/${alertId}/expire`, { alertId });

export default expireAlert;
