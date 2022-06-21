import GET from 'API/utils/GET';
import { PropertyWithOccupants } from '../Types';

const getPropertiesWithOccupants = (): Promise<PropertyWithOccupants[]> => GET.wrapper(`${API_ROOT}/documents/properties`);

export default getPropertiesWithOccupants;
