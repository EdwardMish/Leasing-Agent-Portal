import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocationsAPI, { LocationsOccupantDetail } from '../../../API/Locations';

import { LocationsActions, LocationsActionTypes } from '../actions';
import { OccupantDetail } from '../Types/OccupantDetail';

import * as selectors from '../selectors';

type PropertiesFromStateHook = (occupantId: number | string) => {
    isLoaded: boolean;
    occupant: OccupantDetail | null;
}

const useLocationsOccupantFromState: PropertiesFromStateHook = (occupantId: number | string) => {
    const dispatch = useDispatch();

    const occupantDetails: OccupantDetail | null = useSelector(selectors.occupantDetails(occupantId));
    const occupantDetailsLoaded: boolean = useSelector(selectors.occupantDetailsLoaded(occupantId));

    const [pending, togglePending] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!occupantDetailsLoaded && !pending) {
            togglePending(true);

            LocationsAPI.getOccupantDetails(occupantId)
                .then((occupantResponse: LocationsOccupantDetail) => {
                    dispatch({
                        type: LocationsActions.ADD_OCCUPANT_DETAILS,
                        payload: occupantResponse as OccupantDetail,
                    } as LocationsActionTypes);

                    togglePending(false);
                })
                .catch((error) => {
                    dispatch({
                        type: LocationsActions.SET_PROPERTIES_ERROR_STATE,
                        payload: {
                            errorMessage: error?.code ? error.code : 'We were not able to load properties.',
                        },
                    } as LocationsActionTypes);

                    togglePending(false);
                });
        }
    }, [occupantDetailsLoaded, pending]);

    return {
        isLoaded: occupantDetailsLoaded,
        occupant: occupantDetails,
    };
};

export default useLocationsOccupantFromState;
