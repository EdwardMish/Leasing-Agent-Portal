import * as React from 'react';

import { featureGroups } from '../featureGroups';
import { IDPlansFeatureGroup } from '../Types';
import { IDPlanFeatures } from '../Types/IDPlanFeatures';
import { IDPlansNavigationPanel } from './IDPlansNavigationPanel';

const styles = require('./id-plans-navigation.module.css');

interface IDPlansNavigationProps {
    handler: (identifier: string) => void;
}

const groups = featureGroups();

const activeFeatureGroups: IDPlansFeatureGroup[] = [
    groups[IDPlanFeatures.Electric],
    groups[IDPlanFeatures.Gas],
    groups[IDPlanFeatures.HVAC],
    groups[IDPlanFeatures.Parking],
    groups[IDPlanFeatures.Water],
];

export const IDPlansNavigation: React.FC<IDPlansNavigationProps> = ({ handler }) => (
    <div className={styles.IDPlansNavigation}>
        {
            activeFeatureGroups.map((group: IDPlansFeatureGroup) => (
                <div
                    className={styles.IDPlansNavigationPanel}
                    key={group.identifier}
                    onClick={() => { handler(group.identifier); }}
                >
                    <IDPlansNavigationPanel featureGroup={group} />
                </div>
            ))
        }
    </div>
);
