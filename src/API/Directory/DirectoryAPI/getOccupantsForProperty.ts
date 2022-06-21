import GET from 'API/utils/GET';
import { DirectoryOccupant } from '../DirectoryTypes/DirectoryOccupant';

const getOccupantsForProperty = (propertyId: number): Promise<DirectoryOccupant[]> =>
    GET.wrapper(`${API_ROOT}/directory/properties/${propertyId}/occupants`);

export default getOccupantsForProperty;
