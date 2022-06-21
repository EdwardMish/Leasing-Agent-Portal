import GET from 'API/utils/GET';
import { PropertyContactResponse } from '../PropertyTypes/PropertyContactResponse';

const getContacts = (propertyId: number | string): Promise<PropertyContactResponse[]> =>
    GET.wrapper<PropertyContactResponse[]>(`${API_ROOT}/properties/${propertyId}/contacts`);

export default getContacts;
