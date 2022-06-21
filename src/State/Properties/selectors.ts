import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { Property } from '../Shared/Types/Property'

const propertiesState = ({ properties }: State) => properties

// Properties
const propertiesSlice = createSelector(
    propertiesState,
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
    ({ loadStatus, ...rest }) => rest
)

export const propertiesList = createSelector(
    propertiesSlice,
    ({ loadStatus, ...rest }) => Object.values(rest)
)

export const sortedPropertiesList = createSelector(
    propertiesState,
    ({ properties, sortOrder }) => sortOrder.map((i) => properties[i])
)

export const property = (propertyId: number | string) => createSelector(
    propertiesSlice,
    (properties): Property => properties[propertyId] || {}
)

export const propertyIsLoaded = (propertyId: number | string) => createSelector(
    propertiesSlice,
    (properties): boolean => properties.hasOwnProperty(propertyId)
)

// Errors
export const propertiesHaveErrors = createSelector(
    propertiesLoadStatus,
    (loadStatus) => loadStatus === LoadStatus.ERROR
)

export const propertiesError = createSelector(
    propertiesSlice,
    ({ errorState = {} }) => errorState.hasOwnProperty('error') ? errorState['error'] : ''
)

// Property Occupants
const propertyOccupantSlice = createSelector(
    propertiesState,
    ({ propertyOccupants }) => propertyOccupants
)

export const propertyOccupants = (propertyId: number | string) => createSelector(
    propertyOccupantSlice,
    (propertyOccupants) => propertyOccupants[propertyId] || []
)

export const occupantsAreLoadedForProperty = (propertyId: number | string) => createSelector(
    propertyOccupantSlice,
    (propertyOccupants) => propertyOccupants.hasOwnProperty(propertyId)
)

// Property Spaces
const propertySpacesSlice = createSelector(
    propertiesState,
    ({ propertySpaces }) => propertySpaces
)

export const propertySpaces = (propertyId: number | string) => createSelector(
    propertySpacesSlice,
    (propertySpaces) => propertySpaces[propertyId] || []
)

export const spacesAreLoadedForProperty = (propertyId: number | string) => createSelector(
    propertySpacesSlice,
    (propertySpaces) => propertySpaces.hasOwnProperty(propertyId)
)