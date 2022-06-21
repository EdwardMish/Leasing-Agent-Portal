import POST from 'API/utils/POST';

const addAttachments = (newsId: number | string, attachments: File[]): Promise<void> =>
    POST.postAttachments(`${API_ROOT}/news/${newsId}/attachments`, 'attachments', attachments);

export default addAttachments;
