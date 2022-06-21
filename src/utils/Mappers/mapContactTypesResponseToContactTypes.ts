import { ContactTypesResponse } from 'API/Contact/ContactTypes/ContactTypesResponse';
import { Contacts } from 'State';

export const mapContactTypesResponseToContactTypes = ({
    description,
    id,
}: ContactTypesResponse): Contacts.Types.ContactType => ({
    description,
    id,
});

