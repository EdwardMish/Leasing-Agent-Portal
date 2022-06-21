import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { Contact } from './Types/Contact'

const contactsState = ({ contacts }: State) => contacts

// Contact Types
const contactTypesSlice = createSelector(
    contactsState,
    ({ contactTypes }) => contactTypes
)

export const contactTypesLoadStatus = createSelector(
    contactTypesSlice,
    ({ loadStatus }) => loadStatus
)

export const contactTypesAreLoaded = createSelector(
    contactTypesSlice,
    ({ loadStatus }) => loadStatus === LoadStatus.LOADED
)

export const contactTypes = createSelector(
    contactTypesSlice,
    ({ loadStatus, ...rest }) => rest
)

export const contactTypesList = createSelector(
    contactTypesSlice,
    ({ loadStatus, ...rest }) => Object.values(rest)
)

// Occupant Contacts
const occupantsSlice = createSelector(
    contactsState,
    ({ occupants }) => occupants
)

export const contactsAreLoadedForOccupant = (occupantId: number | string) => createSelector(
    occupantsSlice,
    (contacts) => contacts.hasOwnProperty(occupantId)
)

export const occupantContacts = (occupantId: number | string) => createSelector(
    occupantsSlice,
    (contacts) => contacts[occupantId] || []
)

export const occupantContact = (occupantId: number | string, contactId: number | string) => createSelector(
    occupantContacts(occupantId),
    (occupantContacts) => occupantContacts.find((c: Contact) => `${c.id}` === `${contactId}`) || {}
)

// Property Contacts
const propertiesSlice = createSelector(
    contactsState,
    ({ properties }) => properties
)

export const contactsAreLoadedForProperty = (propertyId: number | string) => createSelector(
    propertiesSlice,
    (contacts) => contacts.hasOwnProperty(propertyId)
)

export const propertyContacts = (propertyId: number | string) => createSelector(
    propertiesSlice,
    (contacts) => contacts[propertyId] || []
)

// User Contacts
const userContactsSlice = createSelector(
    contactsState,
    ({ userContacts }) => userContacts
)

export const userContactsLoadStatus = createSelector(
    userContactsSlice,
    ({ loadStatus }) => loadStatus
)

export const userContactsAreLoaded = createSelector(
    userContactsSlice,
    ({ loadStatus }) => loadStatus === LoadStatus.LOADED
)

export const userContacts = createSelector(
    userContactsSlice,
    ({ loadStatus, ...rest }) => rest
)

export const userContactsList = createSelector(
    userContactsSlice,
    ({ loadStatus, ...rest }) => Object.values(rest)
)