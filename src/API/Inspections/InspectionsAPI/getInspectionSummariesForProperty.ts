import GET from 'API/utils/GET';
import { InspectionSummary } from '../InspectionsTypes/InspectionSummary';

const getInspectionSummariesForProperty = (propertyId: number): Promise<InspectionSummary[]> =>
    GET.wrapper<InspectionSummary[]>(`${API_ROOT}/inspections/properties/${propertyId}/inspections`);

export default getInspectionSummariesForProperty;
