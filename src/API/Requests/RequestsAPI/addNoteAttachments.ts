import POST from 'API/utils/POST';

const addNoteAttachments = (requestId: number | string, noteId: number, attachments: File[]): Promise<void> =>
    POST.postAttachments(`${API_ROOT}/requests/${requestId}/notes/${noteId}/attachments`, 'attachments', attachments);

export default addNoteAttachments;
