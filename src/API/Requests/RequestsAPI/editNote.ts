import PATCH from 'API/utils/PATCH';

const editNote = (requestId: number | string, noteId: number, note: string): Promise<void> =>
    PATCH.wrapper<{ note: string }>(`${API_ROOT}/requests/${requestId}/notes/${noteId}/text`, { note });

export default editNote;
