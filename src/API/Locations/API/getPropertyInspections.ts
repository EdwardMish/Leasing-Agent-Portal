import GET from 'API/utils/GET';
import { LocationsInspectionSummary } from '../Types/LocationsInspectionSummary';

const getPropertyInspections = (propertyId: string | number): Promise<LocationsInspectionSummary[]> =>
    GET.wrapper(`${API_ROOT}/locations/properties/${propertyId}/inspections`);

export default getPropertyInspections;
