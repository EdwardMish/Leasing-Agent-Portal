import { Contact } from './Types/Contact'
import { ContactType } from './Types/ContactType'

export enum ContactActions {
    ADD_OCCUPANT_CONTACTS = 'ADD_OCCUPANT_CONTACTS',
    ADD_PROPERTY_CONTACTS = 'ADD_PROPERTY_CONTACTS',
    LOAD_CONTACT_TYPES = 'LOAD_CONTACT_TYPES',
    SET_CONTACT_TYPES = 'SET_CONTACT_TYPES',
    LOAD_USER_CONTACTS = 'LOAD_USER_CONTACTS',
    SET_USER_CONTACTS = 'SET_USER_CONTACTS',
}

interface AddOccupantContactsAction {
    type: typeof ContactActions.ADD_OCCUPANT_CONTACTS;
    payload: {
        occupantId: number | string;
        contacts: Contact[];
    }
}

interface AddPropertyContactsAction {
    type: typeof ContactActions.ADD_PROPERTY_CONTACTS;
    payload: {
        propertyId: number | string;
        contacts: Contact[];
    }
}

interface LoadContactTypesAction {
    type: typeof ContactActions.LOAD_CONTACT_TYPES;
}

interface SetContactTypesAction {
    type: typeof ContactActions.SET_CONTACT_TYPES;
    payload: ContactType[];
}

interface LoadUserContactsAction {
    type: typeof ContactActions.LOAD_USER_CONTACTS;
}

interface SetUserContactsAction {
    type: typeof ContactActions.SET_USER_CONTACTS;
    payload: Contact[];
}

export type ContactActionTypes =
    AddOccupantContactsAction
    | AddPropertyContactsAction
    | LoadContactTypesAction
    | SetContactTypesAction
    | LoadUserContactsAction
    | SetUserContactsAction