import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { DirectoryOccupant, DirectoryPropertyWithOccupants } from './Types'

const directoryState = ({ directory }: State) => directory

// Properties
const propertiesSlice = createSelector(
    directoryState,
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
    ({ loadStatus, errorState, sortOrder, ...rest }) => Object.values(rest)
)

export const sortedPropertiesList = createSelector(
    directoryState,
    ({ properties }): DirectoryPropertyWithOccupants[] => properties.sortOrder?.map((i) => properties[i]) || []
)

export const property = (propertyId: number) => createSelector(
    propertiesSlice,
    (properties): DirectoryPropertyWithOccupants => properties[propertyId] || {}
)

// Errors
export const propertiesHaveErrors = createSelector(
    propertiesLoadStatus,
    (loadStatus): boolean => loadStatus === LoadStatus.ERROR
)

// Occupants
export const propertyOccupants = (propertyId: number) => createSelector(
    propertiesSlice,
    (properties): DirectoryOccupant[] => properties[propertyId].occupants || []
)

export const occupant = (propertyId: number, occupantId: number) => createSelector(
    propertiesSlice,
    (properties): DirectoryOccupant | undefined => properties.hasOwnProperty(propertyId) && properties[propertyId].occupants.some(o => o.id === occupantId)
        ? properties[propertyId].occupants.filter(o => o.id === occupantId)[0]
        : undefined
)
