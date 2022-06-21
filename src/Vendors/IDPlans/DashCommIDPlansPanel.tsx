import * as React from 'react';

import { Panel } from './Panel';

interface DashCommIDPlansPanelProps {
    propertyId: number | string;
}

export const DashCommIDPlansPanel: React.FC<DashCommIDPlansPanelProps> = ({ propertyId }) => {
    const id: number = typeof propertyId === 'string' ? parseInt(propertyId) : propertyId;

    return (<Panel propertyId={id} />);
};
