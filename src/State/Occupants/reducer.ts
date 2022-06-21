import { OccupantState } from './Types'

import { OccupantActions, OccupantActionTypes } from './actions'

export const initialState: OccupantState = {
    occupants: {}
}

export function occupantsReducer(state: OccupantState = initialState, action: OccupantActionTypes): OccupantState {
    switch (action.type) {
        case OccupantActions.ADD_OCCUPANT:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    [action.payload.id]: action.payload
                }
            }
        case OccupantActions.ADD_OCCUPANTS:
            return {
                ...state,
                occupants: {
                    ...state.occupants,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                }
            }
        default:
            return state;
    }
}