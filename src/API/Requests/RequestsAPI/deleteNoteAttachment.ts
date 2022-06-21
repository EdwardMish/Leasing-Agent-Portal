import DELETE from 'API/utils/DELETE';

const deleteNoteAttachment = (requestId: number | string, noteId: number, fileName: string | number): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/requests/${requestId}/notes/${noteId}/attachments/${fileName}/delete`);

export default deleteNoteAttachment;
