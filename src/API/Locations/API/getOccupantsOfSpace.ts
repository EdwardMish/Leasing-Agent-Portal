import GET from 'API/utils/GET';
import { LocationsOccupantDetail } from '../Types/LocationsOccupantDetail';

const getOccupantsOfSpace = (propertyId: number | string, spaceId: number | string): Promise<LocationsOccupantDetail[]> =>
    GET.wrapper<LocationsOccupantDetail[]>(`${API_ROOT}/properties/${propertyId}/spaces/${spaceId}/occupants`);

export default getOccupantsOfSpace;
