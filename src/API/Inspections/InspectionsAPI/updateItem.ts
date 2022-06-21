import PUT from 'API/utils/PUT';

const updateItem = (
    inspectionId: number | string,
    itemId: number,
    followUp: boolean,
    categoryId: number,
    note?: string,
): Promise<void> =>
    PUT.wrapper<{
        followUp: boolean;
        categoryId: number;
        note?: string;
    }>(`${API_ROOT}/inspections/${inspectionId}/items/${itemId}`, { followUp, categoryId, note });

export default updateItem;
