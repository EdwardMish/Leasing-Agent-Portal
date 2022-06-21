import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'

const propertyTenantResolutionState = ({ propertyTenantResolution }: State) => propertyTenantResolution

export const propertiesWithOccupantsLoadStatus = createSelector(
    propertyTenantResolutionState,
    ({ loadStatus }) => loadStatus
)

export const propertiesWithOccupantssAreLoaded = createSelector(
    propertiesWithOccupantsLoadStatus,
    (loadStatus) => loadStatus === LoadStatus.LOADED
)

export const propertiesWithOccupants = createSelector(
    propertyTenantResolutionState,
    ({ loadStatus, sortOrder, ...rest }) => rest
)

export const propertiesWithOccupantsList = createSelector(
    propertyTenantResolutionState,
    ({ loadStatus, sortOrder, ...rest }) => Object.values(rest)
)

export const sortedPropertiesWithOccupantsList = createSelector(
    propertyTenantResolutionState,
    (propertyTenantResolutionState) => propertyTenantResolutionState.sortOrder?.map((i) => propertyTenantResolutionState[i]) || []
)

export const propertyWithOccupants = (propertyId: number | string) => createSelector(
    propertyTenantResolutionState,
    (propertyTenantResolutionState) => propertyTenantResolutionState[propertyId] || {}
)

export const propertyWithOccupantsIsLoaded = (propertyId: number | string) => createSelector(
    propertyTenantResolutionState,
    (propertyTenantResolutionState) => propertyTenantResolutionState.hasOwnProperty(propertyId)
)