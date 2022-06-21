import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { DocumentOccupant, DocumentPropertyWithOccupants } from './Types'

const DocumentState = ({ documents }: State) => documents

// Properties
const propertiesSlice = createSelector(
    DocumentState,
    ({ properties }) => properties
)

export const propertiesLoadStatus = createSelector(
    propertiesSlice,
    ({ loadStatus }) => loadStatus
)

export const propertiesAreLoaded = createSelector(
    propertiesLoadStatus,
    (loadStatus) => loadStatus === LoadStatus.LOADED
)

export const properties = createSelector(
    propertiesSlice,
    ({ loadStatus, sortOrder, ...rest }) => sortOrder?.map(_ => rest[_])
)

export const propertiesList = createSelector(
    propertiesSlice,
    ({ loadStatus, errorState, sortOrder, ...rest }) => Object.values(rest)
)

export const sortedPropertiesList = createSelector(
    DocumentState,
    ({ properties }): DocumentPropertyWithOccupants[] => properties.sortOrder?.map((i) => properties[i]) || []
)

export const property = (propertyId: number | string) => createSelector(
    propertiesSlice,
    (properties): DocumentPropertyWithOccupants | null => properties.hasOwnProperty(propertyId) ? properties[propertyId] : null
)

// Errors
export const propertiesHaveErrors = createSelector(
    propertiesLoadStatus,
    (loadStatus): boolean => loadStatus === LoadStatus.ERROR
)

// Occupants
export const propertyOccupants = (propertyId: number) => createSelector(
    propertiesSlice,
    (properties): DocumentOccupant[] => properties[propertyId].occupants || []
)

export const occupant = (propertyId: number | string, occupantId: number | string) => createSelector(
    propertiesSlice,
    (properties): DocumentOccupant | null => properties.hasOwnProperty(propertyId) && properties[propertyId].occupants.some(o => o.id == occupantId)
        ? properties[propertyId].occupants.filter(o => o.id == occupantId)[0]
        : null
)
