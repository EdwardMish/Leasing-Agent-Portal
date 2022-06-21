import { OccupantContactResponse } from 'API/Contact/ContactTypes/OccupationContactResponse';
import { Contacts } from 'State';

export const mapOccupantContactToContact = ({
    contactId,
    name,
    businessPhone,
    mobilePhone,
    email,
    associations,
}: OccupantContactResponse): Contacts.Types.Contact => ({
    businessPhone,
    email,
    id: contactId,
    mobilePhone,
    name,
    // TODO: Where are these used
    contactType: '',
    associations,
});

