import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocationsAPI, { LocationsOccupantDetail } from '../../../API/Locations';

import { LocationsActions, LocationsActionTypes } from '../actions';
import mapLocationsSpaceOccupantToSpaceOccupant from '../Mappers/mapLocationsSpaceOccupantToSpaceOccupant';
import { OccupantDetail } from '../Types/OccupantDetail';

import * as selectors from '../selectors';

type SpacesFromStateHook = (propertyId: number | string, spaceId: number | string) => {
    areLoaded: boolean;
    spaceOccupants: OccupantDetail[];
}

const useLocationsSpaceOccupantsFromState: SpacesFromStateHook = (propertyId: number | string, spaceId: number | string) => {
    const dispatch = useDispatch();

    const areLoaded: boolean = useSelector(selectors.occupantsLoadedForSpace(spaceId));
    const spaceOccupants: OccupantDetail[] = useSelector(selectors.spaceOccupants(spaceId));

    React.useEffect(() => {
        if (!areLoaded) {
            LocationsAPI.getOccupantsOfSpace(propertyId, spaceId)
                .then((occupantsResponse: LocationsOccupantDetail[]) => {
                    dispatch({
                        type: LocationsActions.ADD_SPACE_OCCUPANTS,
                        payload: {
                            spaceId,
                            occupants: occupantsResponse.map((o) => mapLocationsSpaceOccupantToSpaceOccupant(o)),
                        },
                    } as LocationsActionTypes);
                });
        }
    }, [areLoaded]);

    return {
        areLoaded,
        spaceOccupants,
    };
};

export default useLocationsSpaceOccupantsFromState;
