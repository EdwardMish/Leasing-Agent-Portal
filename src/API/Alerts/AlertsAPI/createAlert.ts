import { POST } from 'API/utils';

const createAlert = (propertyId: number | string, message: string): Promise<void> =>
    POST.wrapper<{
        propertyId: number | string;
        message: string;
    }>(`${API_ROOT}/alerts`, {
        propertyId,
        message,
    });

export default createAlert;
