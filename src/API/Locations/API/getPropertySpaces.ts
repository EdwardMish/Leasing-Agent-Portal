import GET from 'API/utils/GET';
import { LocationsSpace } from '../Types/LocationsSpace';

// TODO: Transition to Locations
const getPropertySpaces = (propertyId: number | string): Promise<LocationsSpace[]> =>
    GET.wrapper<LocationsSpace[]>(`${API_ROOT}/properties/${propertyId}/spaces`);

export default getPropertySpaces;
