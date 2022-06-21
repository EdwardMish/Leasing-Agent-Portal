import { createSelector } from 'reselect'

import { State } from '../../Types'

const occupantsState = ({ occupants }: State) => occupants

const occupantsSlice = createSelector(
    occupantsState,
    ({ occupants }) => occupants
)

export const occupants = createSelector(
    occupantsSlice,
    (occupants) => occupants
)

export const occupantIsLoaded = (occupantId: number | string) => createSelector(
    occupants,
    (occupants) => occupants.hasOwnProperty(occupantId)
)

export const occupant = (occupantId: number | string) => createSelector(
    occupants,
    (occupants) => occupants[occupantId] || {}
)

export const occupantsById = (occupantIds: number[]) => createSelector(
    occupants,
    (occupants) => occupantIds.map((id) => occupants[id] || undefined).filter((o) => !!o)
)

export const occupantsAreLoaded = (occupantIds: number[]) => createSelector(
    occupants,
    (occupants) => {
        const occupantStateIds: number[] = Object.keys(occupants).map((id: string) => parseInt(id))

        return !(!!occupantIds.length) ? false : occupantIds.every((id) => occupantStateIds.includes(id))
    }
)
