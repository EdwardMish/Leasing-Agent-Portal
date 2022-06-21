import GET from 'API/utils/GET';
import { AttachmentResponse } from '../RequestsTypes/AttachmentResponse';

const getAttachments = (requestId: number): Promise<AttachmentResponse[]> =>
    GET.wrapper<AttachmentResponse[]>(`${API_ROOT}/requests/${requestId}/attachments`);

export default getAttachments;
