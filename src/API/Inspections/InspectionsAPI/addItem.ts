import POST from 'API/utils/POST';

const addItem = (
    inspectionId: number | string,
    note: string,
    followUp: boolean,
    categoryId: number,
    interactionId?: number,
): Promise<{
    itemId: number;
}> =>
    POST.postWithResponse<
        {
            note: string;
            followUp: boolean;
            categoryId: number;
            interactionId?: number;
        },
        {
            itemId: number;
        }
    >(`${API_ROOT}/inspections/${inspectionId}/items`, {
        note,
        followUp,
        categoryId,
        interactionId,
    });

export default addItem;
