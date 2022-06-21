import { SpacesState } from './Types'

import { SpaceActions, SpaceActionTypes } from './actions'

export const initialState: SpacesState = {
    spaces: {},
    spaceOccupants: {},
}

export function spacesReducer(state: SpacesState = initialState, action: SpaceActionTypes): SpacesState {
    switch (action.type) {
        case SpaceActions.ADD_SPACE:
            return {
                ...state,
                spaces: {
                    ...state.spaces,
                    [action.payload.id]: action.payload
                }
            }
        case SpaceActions.ADD_SPACES:
            return {
                ...state,
                spaces: {
                    ...state.spaces,
                    ...action.payload.reduce((agg, curr) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                }
            }
        case SpaceActions.ADD_SPACE_OCCUPANTS:
            return {
                ...state,
                spaceOccupants: {
                    ...state.spaceOccupants,
                    [action.payload.spaceId]: action.payload.occupants
                }
            }
        default:
            return state;
    }
}