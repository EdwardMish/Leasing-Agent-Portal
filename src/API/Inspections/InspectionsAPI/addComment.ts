import POST from 'API/utils/POST';

const addComment = (
    inspectionId: string | number,
    note: string,
    parentNoteId: number | null,
): Promise<{ commentId: number }> =>
    POST.postWithResponse(`${API_ROOT}/inspections/${inspectionId}/comments`, {
        note,
        parentNoteId,
    });

export default addComment;
