import GET from 'API/utils/GET';
import { OccupantOfProperty } from '../OccupantTypes/OccupantOfProperty';

const getOccupantsOfProperty = (propertyId: number | string): Promise<OccupantOfProperty[]> =>
    GET.wrapper<OccupantOfProperty[]>(`${API_ROOT}/properties/${propertyId}/occupants`);

export default getOccupantsOfProperty;
