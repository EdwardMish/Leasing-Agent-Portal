import { FeatureFlag } from './Types';

export enum FeatureFlagActions {
    LOAD_FEATURE_FLAGS = 'LOAD_FEATURE_FLAGS',
    SET_FEATURE_FLAGS = 'SET_FEATURE_FLAGS'
}

interface LoadFeatureFlags {
    type: typeof FeatureFlagActions.LOAD_FEATURE_FLAGS
}

interface SetFeatureFlags {
    type: typeof FeatureFlagActions.SET_FEATURE_FLAGS,
    payload: FeatureFlag[]
}

export type FeatureFlagActionTypes = LoadFeatureFlags
    | SetFeatureFlags