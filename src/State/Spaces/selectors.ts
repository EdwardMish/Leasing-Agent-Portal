import { createSelector } from 'reselect'

import { State } from '../../Types'

const spacesState = ({ spaces }: State) => spaces

// Spaces
const spacesSlice = createSelector(
    spacesState,
    ({ spaces }) => spaces
)

export const spaces = createSelector(
    spacesSlice,
    (spaces) => spaces
)

export const spaceIsLoaded = (spaceId: number | string) => createSelector(
    spaces,
    (spaces) => spaces.hasOwnProperty(spaceId)
)

export const space = (spaceId: number | string) => createSelector(
    spaces,
    (spaces) => spaces[spaceId] || {}
)

export const spacesById = (spaceIds: number[]) => createSelector(
    spaces,
    (spaces) => spaceIds.map((id) => spaces[id] || undefined).filter((s) => !!s)
)

export const spacesAreLoaded = (spaceIds: number[]) => createSelector(
    spaces,
    (spaces) => {
        const spacesStateIds = Object.keys(spaces)

        return !(!!spacesStateIds.length) ? false : spaceIds.every((id) => spacesStateIds.includes(`${id}`))
    }
)

// Space Occupants
const spaceOccupantsSlice = createSelector(
    spacesState,
    ({ spaceOccupants }) => spaceOccupants
)

export const spaceOccupants = (spaceId: number | string) => createSelector(
    spaceOccupantsSlice,
    (spaceOccupants) => spaceOccupants[spaceId] || []
)

export const occupantsLoadedForSpace = (spaceId: number | string) => createSelector(
    spaceOccupantsSlice,
    (spaceOccupants) => spaceOccupants.hasOwnProperty(spaceId)
)