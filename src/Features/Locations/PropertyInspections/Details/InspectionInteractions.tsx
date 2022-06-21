import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InteractionItem } from '../../../../State/Inspections/Types/InteractionItem';

import { selectors } from '../../../../State/Locations';

import InteractionRow from '../../../../Shared/Inspections/DetailRows/InteractionRow';

const InspectionInteractions = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const interactions: InteractionItem[] = useSelector(selectors.interactions(inspectionId))

    return (
        <div>
            {
                interactions.map((interactionItem) => (
                    <React.Fragment key={`interaction-items-${interactionItem.id}`}>
                        <InteractionRow interaction={interactionItem} inspectionId={inspectionId} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default InspectionInteractions;
