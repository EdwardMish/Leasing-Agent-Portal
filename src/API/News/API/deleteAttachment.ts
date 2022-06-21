import DELETE from 'API/utils/DELETE';

const deleteAttachment = (newsId: string | number, identifier: string | number): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/news/${newsId}/attachments/${identifier}/delete`);

export default deleteAttachment;
