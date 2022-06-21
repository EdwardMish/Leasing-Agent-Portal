import { ContactAssociation } from 'State/Contacts/Types/ContactAssociation';

export interface OccupantContactResponse {
    contactId: number;
    name: string;
    businessPhone: string;
    mobilePhone: string;
    email: string;
    associations: ContactAssociation[];
}
