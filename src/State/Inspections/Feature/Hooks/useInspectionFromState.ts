import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Inspections, { Types } from '../../../../API/Inspections';

import { InspectionsFeatureActions, InspectionsFeatureActionTypes } from '../actions';
import { inspection as inspectionSelector } from '../selectors';

import { Inspection } from '../../Types/Inspection';

interface InspectionFromStateHook {
    inspectionIsLoaded: boolean;
    inspection: Inspection | null;
}

export default (inspectionId: number | string): InspectionFromStateHook => {
    const dispatch = useDispatch();

    const inspection: Inspection | null = useSelector(inspectionSelector(inspectionId));

    const [isLoaded, toggleIsLoaded] = React.useState<boolean>(false);
    const [isPending, toggleIsPending] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isLoaded && !isPending) {
            if (!inspection || inspection.id != inspectionId) {
                toggleIsPending(true);

                Inspections.getInspection(inspectionId).then((response: Types.Inspection) => {
                    dispatch({
                        type: InspectionsFeatureActions.ADD_INSPECTION,
                        payload: response,
                    } as InspectionsFeatureActionTypes);

                    toggleIsPending(false);
                    toggleIsLoaded(true);
                });
            }
        }
    }, [inspectionId, inspection]);

    return {
        inspectionIsLoaded: !isPending && isLoaded,
        inspection,
    };
};
