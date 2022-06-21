import DELETE from 'API/utils/DELETE';

const deleteAttachment = (requestId: number | string, attachmentName: string): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/requests/${requestId}/attachments/${attachmentName}/delete`);

export default deleteAttachment;
