import GET from 'API/utils/GET';
import { Occupant } from '../OccupantTypes/Occupant';

const getOccupantsOfSpace = (propertyId: number | string, spaceId: number | string): Promise<Occupant[]> =>
    GET.wrapper<Occupant[]>(`${API_ROOT}/properties/${propertyId}/spaces/${spaceId}/occupants`);

export default getOccupantsOfSpace;
