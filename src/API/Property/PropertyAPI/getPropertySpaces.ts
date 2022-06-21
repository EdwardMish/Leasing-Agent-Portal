import GET from 'API/utils/GET';
import { SpaceResponse } from '../PropertyTypes/SpaceResponse';

const getPropertySpaces = (propertyId: number | string): Promise<SpaceResponse[]> =>
    GET.wrapper<SpaceResponse[]>(`${API_ROOT}/properties/${propertyId}/spaces`);

export default getPropertySpaces;
