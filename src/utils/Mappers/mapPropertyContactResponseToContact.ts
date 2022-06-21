import { PropertyTypes } from 'API/Property';
import { Contact } from '../../State/Contacts/Types';

export const mapPropertyContactResponseToContact = ({
    businessPhone,
    contactType,
    email,
    id,
    mobilePhone,
    name,
}: PropertyTypes.PropertyContactResponse): Contact => ({
    businessPhone,
    contactType,
    email,
    id,
    mobilePhone,
    name,
    // TODO: Should these be handled elsewhere
    associations: [],
});

