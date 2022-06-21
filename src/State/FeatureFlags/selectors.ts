import { createSelector } from 'reselect'

import { FeatureFlag, FeatureFlags } from './Types'
import { LoadStatus, State } from '../../Types'

const featureFlagsState = ({ featureFlags }: State) => featureFlags

export const featureFlags = createSelector(
    featureFlagsState,
    (featuresStateRecord) => Object.values(featuresStateRecord).filter((c: LoadStatus | FeatureFlag) => typeof c === 'object')
)

export const featureFlagsLoadStatus = createSelector(
    featureFlagsState,
    (featuresStateRecord) => featuresStateRecord.loadStatus
)

export const featureFlagsAreLoaded = createSelector(
    featureFlagsLoadStatus,
    (loadStatus) => loadStatus === LoadStatus.LOADED
)

export const featureFlagsByType = (feature: FeatureFlags) => createSelector(
    featureFlagsState,
    (features) => features[feature]
)

export const featureIsEnabled = (feature: FeatureFlags) => createSelector(
    featureFlagsByType(feature),
    (feature: FeatureFlag) => feature?.enabled || false
)