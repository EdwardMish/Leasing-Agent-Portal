import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LocationsAPI from '../../../API/Locations';
import { LocationsInspectionSummary } from '../../../API/Locations/Types/LocationsInspectionSummary';

import { Actions, ActionTypes, selectors } from '../../../State/Locations';
import { LocationInspectionSummary } from '../../../State/Locations/Types/LocationInspectionSummary';

import DynamicContent from '../../../Shared/PageElements/DynamicContent';

import InspectionSummaryList from './InspectionSummaryList';

interface PropertyInspectionsProps {
    propertyId: number;
}

const PropertyInspections: React.FC<PropertyInspectionsProps> = ({ propertyId }) => {
    const dispatch = useDispatch();

    const { url } = useRouteMatch();

    const inspectionSummariesAreLoaded: boolean = useSelector(selectors.inspectionSummariesLoadedForProperty(propertyId));
    const inspectionSummaries: LocationInspectionSummary[] = useSelector(selectors.propertyInspectionSummaries(propertyId));

    const [inspectionsPending, toggleInspectionsPending] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!inspectionSummariesAreLoaded && !inspectionsPending) {
            toggleInspectionsPending(true);

            LocationsAPI.getPropertyInspections(propertyId)
                .then((summariesResponse: LocationsInspectionSummary[]) => {
                    dispatch({
                        type: Actions.ADD_INSPECTION_SUMMARIES,
                        payload: {
                            propertyId,
                            inspectionSummaries: summariesResponse
                        }
                    } as ActionTypes);

                    toggleInspectionsPending(false);
                })
                .catch(() => {
                    toggleInspectionsPending(false);
                });
        }
    }, [inspectionSummariesAreLoaded, inspectionsPending]);

    const linkBuilder = (id: number): string => `${url}/${id}`;

    return (
        <DynamicContent
            loaded={inspectionSummariesAreLoaded}
            noContent={!(!!(inspectionSummaries.length))}
            noContentMessage='No inspections have been completed for this property.'
        >
            <InspectionSummaryList
                inspectionSummaries={inspectionSummaries}
                linkBuilder={linkBuilder}
            />
        </DynamicContent>
    );
};

export default PropertyInspections;
