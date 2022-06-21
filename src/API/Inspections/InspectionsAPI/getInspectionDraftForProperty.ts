import GET from 'API/utils/GET';

const getInspectionDraftForProperty = (
    propertyId: string | number,
): Promise<{
    inspectionDraftId: number;
}> => GET.wrapper(`${API_ROOT}/inspections/properties/${propertyId}/draft`);

export default getInspectionDraftForProperty;
