import POST from 'API/utils/POST';

const createInspection = (
    propertyId: number | string,
): Promise<{
    inspectionId: number;
}> =>
    POST.postWithResponse<
        {
            propertyId: number | string;
        },
        {
            inspectionId: number;
        }
    >(`${API_ROOT}/inspections`, {
        propertyId,
    });

export default createInspection;
