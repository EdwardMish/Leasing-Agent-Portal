import GET from 'API/utils/GET';
import { ContactTypesResponse } from '../ContactTypes/ContactTypesResponse';

const getContactTypes = (): Promise<ContactTypesResponse[]> =>
    GET.wrapper<ContactTypesResponse[]>(`${API_ROOT}/contact-types`);

export default getContactTypes;
