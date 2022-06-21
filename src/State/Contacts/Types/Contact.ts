// TODO: Where are these used
import { ContactAssociation } from './ContactAssociation'

export interface Contact {
    businessPhone: string;
    contactType: string;
    email: string;
    id: number;
    mobilePhone: string;
    name: string;
    // TODO: Where are these used
    associations: ContactAssociation[];
}