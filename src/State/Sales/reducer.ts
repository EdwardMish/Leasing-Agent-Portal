import { LoadStatus, SalesSubmittal } from '../../Types';
import { SalesActions, SalesActionTypes } from './actions';
import { Occupant } from './Types';
import { SalesState } from './Types/SalesState';



const initialState: SalesState = {
    occupantSalesLoaded: [],
    occupants: { loadStatus: LoadStatus.INITIAL_STATE, sortOrder: [] },
    submittals: {},
}

export function salesReducer(state: SalesState = initialState, action: SalesActionTypes): SalesState {
    switch (action.type) {
        case SalesActions.LOAD_SALES_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.PENDING
                }
            }
        case SalesActions.SET_SALES_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {}),
                    sortOrder: action.payload.sort((a, b) => (a.name + a.propertyName).localeCompare(b.name + b.propertyName)).map(({ id }: Occupant) => id)
                }
            }
        case SalesActions.LOAD_OCCUPANT_SALES:
            return {
                ...state,
                occupantSalesLoaded: [...state.occupantSalesLoaded, action.payload]
            }
        case SalesActions.SET_OCCUPANT_SALES:
            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: action.payload.submittals
                }
            }
        case SalesActions.CLEAR_FAILED_LOAD:
            const cflIndex = state.occupantSalesLoaded.indexOf(action.payload)

            return {
                ...state,
                occupantSalesLoaded: cflIndex > -1
                    ? [...state.occupantSalesLoaded.slice(0, cflIndex), ...state.occupantSalesLoaded.slice(cflIndex)]
                    : [...state.occupantSalesLoaded]
            }
        case SalesActions.ADD_MONTHLY_SUBMITTAL:
            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: [
                        ...state.submittals[action.payload.occupantId],
                        action.payload.submittal
                    ]
                }
            }
        case SalesActions.ADD_YEARLY_SUBMITTAL:
            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: [
                        ...state.submittals[action.payload.occupantId],
                        action.payload.submittal
                    ]
                }
            }
        case SalesActions.UPDATE_SUBMITTAL:
            const usOccupantSales = state.submittals[action.payload.occupantId] || []
            const usSubmittalIndex = usOccupantSales.findIndex((s: SalesSubmittal) => s.year === action.payload.year && s.month === action.payload.month)

            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: usSubmittalIndex > -1
                        ? [
                            ...usOccupantSales.slice(0, usSubmittalIndex),
                            ...usOccupantSales.slice(usSubmittalIndex + 1),
                            {
                                ...usOccupantSales[usSubmittalIndex],
                                year: action.payload.year,
                                salesAmount: action.payload.salesAmount,
                                status: action.payload.status,
                                month: action.payload.month,
                            }
                        ]
                        : usOccupantSales
                }
            }
        case SalesActions.UPDATE_SUBMITTAL_STATUS:
            const ussOccupantSales = state.submittals[action.payload.occupantId] || []
            const ussSubmittalIndex = ussOccupantSales.findIndex((s: SalesSubmittal) => s.year === action.payload.year && s.month === action.payload.month)

            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: ussSubmittalIndex > -1
                        ? [
                            ...ussOccupantSales.slice(0, ussSubmittalIndex),
                            ...ussOccupantSales.slice(ussSubmittalIndex + 1),
                            {
                                ...ussOccupantSales[ussSubmittalIndex],
                                status: action.payload.status
                            }
                        ]
                        : ussOccupantSales
                }
            }
        case SalesActions.ADD_NOTE_TO_SALES:
            const antsOccupantSales = state.submittals[action.payload.occupantId] || []
            const antsSubmittalIndex = antsOccupantSales.findIndex((s: SalesSubmittal) => s.year === action.payload.year && s.month === action.payload.month)

            return {
                ...state,
                submittals: {
                    ...state.submittals,
                    [action.payload.occupantId]: antsSubmittalIndex > -1
                        ? [
                            ...antsOccupantSales.slice(0, antsSubmittalIndex),
                            ...antsOccupantSales.slice(antsSubmittalIndex + 1),
                            {
                                ...antsOccupantSales[antsSubmittalIndex],
                                notes: [
                                    ...antsOccupantSales[antsSubmittalIndex].notes,
                                    action.payload.note
                                ]
                            }
                        ]
                        : antsOccupantSales
                }
            }
        default:
            return state;
    }
}