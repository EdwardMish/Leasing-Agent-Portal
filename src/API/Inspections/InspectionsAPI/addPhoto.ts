import POST from 'API/utils/POST';

const addPhoto = (
    inspectionId: number | string,
    image: File,
    interactionId?: number,
): Promise<{
    itemId: number;
}> =>
    POST.postWithResponse<
        {
            image: File;
            interactionId?: number;
        },
        {
            itemId: number;
        }
    >(`${API_ROOT}/inspections/${inspectionId}/items`, { image, interactionId });

export default addPhoto;
