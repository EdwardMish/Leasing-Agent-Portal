import GET from 'API/utils/GET';
import { LocationsProperty } from '../Types/LocationsProperty';

const getProperties = (): Promise<LocationsProperty[]> => GET.wrapper(`${API_ROOT}/locations/properties`);

export default getProperties;
