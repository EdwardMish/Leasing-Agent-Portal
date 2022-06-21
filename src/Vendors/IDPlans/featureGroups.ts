import * as Components from './FeatureComponents';
import * as Icons from './Icons';

import { IDPlanFeatures, IDPlansFeatureGroup } from './Types';
import { idPlansFeatureColors } from './idPlansFeatureColors';

export const featureGroups = (): { [featureName: string]: IDPlansFeatureGroup; } => ({
    [IDPlanFeatures.Electric]: {
        color: idPlansFeatureColors[IDPlanFeatures.Electric],
        Component: Components.Electric,
        display: 'Electric',
        Icon: Icons.Electric,
        identifier: IDPlanFeatures.Electric,
    },
    [IDPlanFeatures.Gas]: {
        color: idPlansFeatureColors[IDPlanFeatures.Gas],
        Component: Components.Gas,
        display: 'Gas',
        Icon: Icons.Gas,
        identifier: IDPlanFeatures.Gas,
    },
    [IDPlanFeatures.HVAC]: {
        color: idPlansFeatureColors[IDPlanFeatures.HVAC],
        Component: Components.HVAC,
        display: 'HVAC',
        Icon: Icons.HVAC,
        identifier: IDPlanFeatures.HVAC,
    },
    [IDPlanFeatures.Parking]: {
        color: idPlansFeatureColors[IDPlanFeatures.Parking],
        Component: Components.Parking,
        display: 'Parking',
        Icon: Icons.Parking,
        identifier: IDPlanFeatures.Parking,
    },
    [IDPlanFeatures.Water]: {
        color: idPlansFeatureColors[IDPlanFeatures.Water],
        Component: Components.Water,
        display: 'Water',
        Icon: Icons.Water,
        identifier: IDPlanFeatures.Water,
    },
});
