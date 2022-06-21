import { createSelector } from 'reselect'
import { LoadStatus, SalesSubmittal, State, StateRecord } from '../../Types'
import { months } from '../../utils'
import { Occupant } from './Types'
import { SalesState } from './Types/SalesState'



const salesState = ({ sales }: State) => sales

// Occupants
export const salesOccupants = createSelector(
    salesState,
    ({ occupants }: SalesState): StateRecord<Occupant> => occupants
)

export const salesOccupantsList = createSelector(
    salesOccupants,
    ({ loadStatus, sortOrder, ...occupants }: StateRecord<Occupant>): Occupant[] => sortOrder?.map(id => occupants[id]) || []
)

export const salesOccupantsLoadStatus = createSelector(
    salesOccupants,
    ({ loadStatus }: StateRecord<Occupant>) => loadStatus
)

export const salesOccupantsAreLoaded = createSelector(
    salesOccupants,
    ({ loadStatus }: StateRecord<Occupant>) => loadStatus === LoadStatus.LOADED
)

export const salesOccupant = (occupantId) => createSelector(
    salesOccupants,
    (occupants: StateRecord<Occupant>) => occupants[occupantId] || {}
)

export const hasSingleSalesOccupant = createSelector(
    salesOccupantsList,
    (occupants) => occupants.length === 1
)

// Sales Submittals
export const salesSubmittals = createSelector(
    salesState,
    ({ submittals }: SalesState) => submittals
)

export const loadedOccupants = createSelector(
    salesState,
    ({ occupantSalesLoaded }: SalesState) => occupantSalesLoaded
)

export const salesForOccupant = (occupantId: number | string) => createSelector(
    salesSubmittals,
    (submittals: Record<number, SalesSubmittal[]>) => submittals[occupantId] || []
)

export const occupantSalesByMonth = (occupantId: number | string, year: number) => createSelector(
    salesSubmittals,
    (submittals: Record<number, SalesSubmittal[]>) => {
        const occupantSubmittals: SalesSubmittal[] = submittals[occupantId] || []

        return Object.keys(months).map((m: string) => {
            const submittal = occupantSubmittals.find((s) => s.year === year && s.month === parseInt(m))

            return submittal ? { submittal, month: m } : { month: m }
        })
    }
)

export const salesForOccupantAreLoaded = (occupantId: number | string) => createSelector(
    salesSubmittals,
    (submittals: Record<number, SalesSubmittal[]>) => submittals.hasOwnProperty(occupantId)
)

export const salesSubmittal = (occupantId: number | string, month: number | string, year: number | string) => createSelector(
    salesSubmittals,
    (submittals: Record<number, SalesSubmittal[]>) => {
        const m = typeof month === 'string' ? parseInt(month) : month
        const y = typeof year === 'string' ? parseInt(year) : year

        return submittals[occupantId]?.find((s: SalesSubmittal) => s.month === m && s.year === y)
    }
)

export const averageForYear = (year: number, occupantId: number | string) => createSelector(
    salesForOccupant(occupantId),
    (submittals: SalesSubmittal[]) => {
        const forYear = submittals
            .filter((s: SalesSubmittal) => s.year === year)
            .map((s: SalesSubmittal) => s.salesAmount)

        return {
            totalRecords: forYear.length,
            average: (forYear.reduce((total, current) => total += current, 0) / forYear.length)
        }
    }
)