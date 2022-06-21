import POST from 'API/utils/POST';

const addInteraction = (
    inspectionId: number | string,
    occupantId: number | string,
): Promise<{
    interactionId: number;
}> =>
    POST.postWithResponse<
        {
            inspectionId: number | string;
            occupantId: number | string;
        },
        {
            interactionId: number;
        }
    >(`${API_ROOT}/inspections/${inspectionId}/interactions`, {
        inspectionId,
        occupantId,
    });

export default addInteraction;
