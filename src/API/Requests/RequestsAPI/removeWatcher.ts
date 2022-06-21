import DELETE from 'API/utils/DELETE';

const removeWatcher = (requestId: number, userId: number): Promise<void> =>
    DELETE.wrapper<{ requestId: number; watchingUserId: number }>(`${API_ROOT}/requests/${requestId}/watchers`, {
        requestId,
        watchingUserId: userId,
    });

export default removeWatcher;
