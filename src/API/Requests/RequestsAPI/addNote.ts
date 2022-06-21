import POST from 'API/utils/POST';

const addNote = (requestId: number | string, note: string, isPrivate: boolean): Promise<{ noteId: number }> =>
    POST.postWithResponse<{ note: string }, { noteId: number }>(
        `${API_ROOT}/requests/${requestId}/${isPrivate ? 'private' : 'public'}-notes`,
        { note },
    );

export default addNote;
