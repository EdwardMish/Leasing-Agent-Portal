import { PATCH } from 'API/utils';

const extendAlert = (alertId: number, minutesToExtend: number): Promise<void> =>
    PATCH.wrapper<{
        alertId: number;
        minutesToExtend: number;
    }>(`${API_ROOT}/alerts/${alertId}/extend`, { alertId, minutesToExtend });

export default extendAlert;
