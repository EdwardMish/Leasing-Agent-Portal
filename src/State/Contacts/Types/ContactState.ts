import { Contact } from './Contact'
import { ContactType } from './ContactType'
import { StateRecord } from '../../../Types'

export interface ContactState {
    occupants: Record<number, Contact[]>;
    properties: Record<number, Contact[]>;
    contactTypes: StateRecord<ContactType>;
    userContacts: StateRecord<Contact>;
}