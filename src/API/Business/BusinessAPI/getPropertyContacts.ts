import { GET } from 'API/utils';
import { PropertyContact } from '../BusinessTypes/PropertyContact';

const getPropertyContacts = (propertyId: number): Promise<PropertyContact[]> =>
    GET.wrapper<PropertyContact[]>(`${API_ROOT}/business-information/property/${propertyId}/property-contacts`);

export default getPropertyContacts;
