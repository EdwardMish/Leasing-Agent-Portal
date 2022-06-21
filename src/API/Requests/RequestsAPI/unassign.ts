import PATCH from 'API/utils/PATCH';

const unassign = (requestId: number): Promise<void> => PATCH.wrapper(`${API_ROOT}/requests/${requestId}/unassign`, {});

export default unassign;
