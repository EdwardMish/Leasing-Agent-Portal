import { LoadStatus } from '../../Types'
import { FeatureFlagActions, FeatureFlagActionTypes } from './actions'
import { FeatureFlagsState } from './Types'

const initialState: FeatureFlagsState = {
    loadStatus: LoadStatus.INITIAL_STATE
}

export function featureFlagsReducer(state: FeatureFlagsState = initialState, action: FeatureFlagActionTypes): FeatureFlagsState {
    switch (action.type) {
        case FeatureFlagActions.LOAD_FEATURE_FLAGS:
            return {
                ...state,
                loadStatus: LoadStatus.PENDING
            }
        case FeatureFlagActions.SET_FEATURE_FLAGS:
            return {
                ...state,
                loadStatus: LoadStatus.LOADED,
                ...action.payload.reduce((agg, curr) => ({
                    ...agg,
                    [curr.feature]: curr
                }), {})
            }
        default:
            return state;
    }
}