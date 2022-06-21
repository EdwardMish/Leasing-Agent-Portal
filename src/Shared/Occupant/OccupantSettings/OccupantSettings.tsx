import disableFeatureForOccupant from 'API/FeatureFlags/FeatureFlagsAPI/disableFeatureForOccupant';
import enableFeatureForOccupant from 'API/FeatureFlags/FeatureFlagsAPI/enableFeatureForOccupant';
import getFeatureFlagsForOccupant from 'API/FeatureFlags/FeatureFlagsAPI/getFeatureFlagsForOccupant';
import * as React from 'react';
import { ToggleLeft, ToggleRight } from '../../../Icons';
import { Occupants } from '../../../State';
import { Feature, FeatureFlag } from '../../../Types';
import { LoadingContent } from '../../PageElements';

const styles = require('./occupant-settings.module.css');

interface OccupantSettingsProps {
    occupant: Occupant;
}

type Occupant = Occupants.Types.Occupant;

export const OccupantSettings: React.FC<OccupantSettingsProps> = ({ occupant }) => {
    const [featureFlags, setFeatureFlags] = React.useState<FeatureFlag[]>([]);

    React.useEffect(() => {
        getFeatureFlagsForOccupant(occupant.id)
            .then((featureFlags) => {
                setFeatureFlags(featureFlags);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [occupant.id]);

    const toggleFeature = async (feature: Feature) => {
        const modifiedFeatureFlags = Array.from(featureFlags);

        const featureFlag = modifiedFeatureFlags.find((_) => _.id == feature);

        if (!featureFlag) {
            throw new Error('Unable to find feature flag');
        }

        if (featureFlag.enabled) {
            try {
                await disableFeatureForOccupant(occupant.id, featureFlag.id);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await enableFeatureForOccupant(occupant.id, featureFlag.id);
            } catch (err) {
                console.log(err);
            }
        }
        featureFlag.enabled = !featureFlag.enabled;

        setFeatureFlags(modifiedFeatureFlags);
    };

    return (
        <>
            {featureFlags.length > 0 ? (
                <div className={styles.OccupantSettings}>
                    {featureFlags.map(({ id, enabled }) => {
                        const featureName = id.toString().charAt(0).toUpperCase() + id.toString().slice(1);

                        return (
                            <p key={`occuapnt-settings-row-${id}`}>
                                <span>{featureName} </span>
                                <button
                                    id={`feature-flag-${id}`}
                                    className={`btn btn-primary ${styles.Button}`}
                                    key={`${id}`}
                                    onClick={() => {
                                        toggleFeature(id);
                                    }}
                                >
                                    {enabled ? <ToggleRight /> : <ToggleLeft />}
                                </button>
                            </p>
                        );
                    })}
                </div>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};

