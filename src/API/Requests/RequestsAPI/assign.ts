import PATCH from 'API/utils/PATCH';

const assign = (requestId: number, userId: number): Promise<void> =>
    PATCH.wrapper<{ assignToUserId: number }>(`${API_ROOT}/requests/${requestId}/assign`, {
        assignToUserId: userId,
    });

export default assign;
