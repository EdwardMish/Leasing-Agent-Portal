import { FeatureFlags } from 'State/FeatureFlags/Types';

export interface FeatureFlag {
    feature: FeatureFlags;
    enabledOccupantIds: number[];
    enabled: boolean;
}
