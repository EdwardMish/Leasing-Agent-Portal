import POST from 'API/utils/POST';

const addAttachments = (requestId: number | string, attachments: File[]): Promise<void> =>
    POST.postAttachments(`${API_ROOT}/requests/${requestId}/attachments`, 'attachments', attachments);

export default addAttachments;
