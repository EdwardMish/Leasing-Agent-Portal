import DELETE from 'API/utils/DELETE';

const deleteItem = (inspectionId: number | string, itemId: number | string): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/inspections/${inspectionId}/items/${itemId}`);

export default deleteItem;
