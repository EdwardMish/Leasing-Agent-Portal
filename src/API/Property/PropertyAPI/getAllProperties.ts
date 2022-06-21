import GET from 'API/utils/GET';
import { PropertyResponse } from '../PropertyTypes/PropertyResponse';

const getAllProperties = (): Promise<PropertyResponse[]> => GET.wrapper<PropertyResponse[]>(`${API_ROOT}/properties`);

export default getAllProperties;
