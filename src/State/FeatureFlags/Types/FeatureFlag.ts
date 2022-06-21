import { FeatureFlags } from './FeatureFlags'

export interface FeatureFlag {
    feature: FeatureFlags;
    enabledOccupantIds: number[];
    enabled: boolean;
}