import PATCH from 'API/utils/PATCH';

const reopenRequest = (requestId: number | string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/requests/${requestId}/reopen`, {});

export default reopenRequest;
