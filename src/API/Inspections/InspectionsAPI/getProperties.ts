import GET from 'API/utils/GET';
import { Property } from '../InspectionsTypes/Property';

const getProperties = (): Promise<Property[]> => GET.wrapper<Property[]>(`${API_ROOT}/inspections/properties`);

export default getProperties;
