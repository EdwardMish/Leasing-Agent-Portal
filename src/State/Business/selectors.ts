import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { BusinessState } from './Types'

type OccupantId = number | string;

const businessState = ({ business }: State) => business

/* Occupants */
const occupantsSlice = createSelector(
    businessState,
    ({ occupants }: BusinessState) => occupants
)

export const occuapantsLoadStatus = createSelector(
    occupantsSlice,
    ({ loadStatus }) => loadStatus
)

export const occupantsAreLoaded = createSelector(
    occuapantsLoadStatus,
    (loadStatus: LoadStatus) => loadStatus === LoadStatus.LOADED
)

export const occupants = createSelector(
    occupantsSlice,
    ({ loadStatus, sortOrder, ...occupants }) => occupants
)

export const sortedOccupantsList = createSelector(
    occupantsSlice,
    ({ loadStatus, sortOrder, ...occupants }) => sortOrder?.map(id => occupants[id]) || []
)

export const occupant = (occupantId: number | string) => createSelector(
    occupantsSlice,
    (occupants) => occupants?.hasOwnProperty(occupantId) ? occupants[occupantId] : {}
)

export const occupantCount = createSelector(
    occupantsSlice,
    ({ sortOrder = [] }) => sortOrder.length
)

/* Business Users */
const businessUsersSlice = createSelector(
    businessState,
    ({ businessUsers }: BusinessState) => businessUsers
)

export const businessUsersOccupantLoadStatus = (occupantId: OccupantId) => createSelector(
    businessUsersSlice,
    (businessUsers) => businessUsers.hasOwnProperty(occupantId) ? businessUsers[occupantId].loadStatus : LoadStatus.INITIAL_STATE
)

export const businessUsersForOccupant = (occupantId: OccupantId) => createSelector(
    businessUsersSlice,
    (businessUsers) => {
        if (businessUsers.hasOwnProperty(occupantId)) {
            const { loadStatus = LoadStatus.INITIAL_STATE, sortOrder = [], ...rest } = businessUsers[occupantId]

            return rest
        }

        return {}
    }
)

export const sortedBusinessUsersForOccupant = (occupantId: OccupantId) => createSelector(
    businessUsersSlice,
    (businessUsers) => {
        if (businessUsers.hasOwnProperty(occupantId)) {
            const { loadStatus = LoadStatus.INITIAL_STATE, sortOrder = [], ...rest } = businessUsers[occupantId]

            return sortOrder.map((i: number) => rest[i])
        }

        return []
    }
)