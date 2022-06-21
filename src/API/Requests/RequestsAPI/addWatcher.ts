import PATCH from 'API/utils/PATCH';

const addWatcher = (requestId: number, userId: number): Promise<void> =>
    PATCH.wrapper<{ requestId: number; watchingUserId: number }>(`${API_ROOT}/requests/${requestId}/watchers`, {
        requestId,
        watchingUserId: userId,
    });

export default addWatcher;
