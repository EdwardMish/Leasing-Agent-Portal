import { createSelector } from 'reselect'
import { OccupantCompliance } from '../../API/Compliance/Types'
import { LoadStatus, State, StateRecord } from '../../Types'
import { Occupant, TenantUser } from './Types'

const welcomeState = ({ welcome }: State) => welcome

export const occupantsSlice = createSelector(
    welcomeState,
    ({ occupants }): StateRecord<Occupant> => occupants
)

export const occupantsLoadStatus = createSelector(
    occupantsSlice,
    ({ loadStatus }): LoadStatus => loadStatus
)

export const occupants = createSelector(
    occupantsSlice,
    ({ loadStatus, errorState, sortOrder, ...rest }): Occupant[] => Object.values(rest) || []
)

export const occupantsRequiringSetup = createSelector(
    occupants,
    (occupants): Occupant[] => occupants.filter(_ => !_.setup)
)

export const isOccupantLoaded = (occupantId: number) => createSelector(
    occupantsSlice,
    (occupants): boolean => occupants.loadStatus === LoadStatus.LOADED && occupants.hasOwnProperty(occupantId)
)

export const occupantToSetup = createSelector(
    occupants,
    (occupants): Occupant | undefined => occupants.filter(_ => !_.setup)[0] || undefined
)

export const occupantUsersSlice = createSelector(
    welcomeState,
    ({ occupantUsers }): Record<number, Record<number, TenantUser>> => occupantUsers
)

export const usersLoadedForOccupant = (occupantId: number) => createSelector(
    occupantUsersSlice,
    (occupantUsers): boolean => occupantUsers.hasOwnProperty(occupantId)
)

export const occupantUsers = (occupantId: number) => createSelector(
    occupantUsersSlice,
    (occupantUsers): TenantUser[] => occupantUsers.hasOwnProperty(occupantId) ? Object.values(occupantUsers[occupantId]) : []
)

const complianceSlice = createSelector(
    welcomeState,
    ({ occupantCompliance }): Record<number, OccupantCompliance[]> => occupantCompliance
)

export const complianceForOccupant = (occupantId: number | string) => createSelector(
    complianceSlice,
    (occupantCompliance): OccupantCompliance[] | null => occupantCompliance.hasOwnProperty(occupantId) ? occupantCompliance[occupantId] : null
)