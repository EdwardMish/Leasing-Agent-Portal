import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InteractionItem } from '../../../../State/Inspections/Types/InteractionItem';

import { selectors } from '../../../../State/Inspections/Feature';

import { NoContent } from '../../../../Shared/PageElements';
import InteractionRow from '../../../../Shared/Inspections/DetailRows/InteractionRow';

const InspectionInteractions = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const interactions: InteractionItem[] = useSelector(selectors.interactions(inspectionId));

    return (
        <>
            {!!interactions && !!interactions.length ? (
                <>
                    {interactions.map((interactionItem) => (
                        <React.Fragment key={`interaction-items-${interactionItem.id}`}>
                            <InteractionRow interaction={interactionItem} inspectionId={inspectionId} />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <NoContent message="No Interactions to Display" />
            )}
        </>
    );
};

export default InspectionInteractions;
