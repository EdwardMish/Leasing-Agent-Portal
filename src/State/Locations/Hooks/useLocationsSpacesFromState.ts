import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapLocationsSpaceToSpace from 'State/Locations/Mappers/mapLocationsSpaceToSpace';
import { Space } from 'State/Shared/Types/Space';
import LocationsAPI, { LocationsSpace } from '../../../API/Locations';
import { LocationsActions, LocationsActionTypes } from '../actions';
import * as selectors from '../selectors';

type SpacesFromStateHook = (propertyId: number | string) => {
    areLoaded: boolean;
    spaces: Space[];
};

const useLocationsSpacesFromState: SpacesFromStateHook = (propertyId: number | string) => {
    const dispatch = useDispatch();

    const areLoaded: boolean = useSelector(selectors.spacesLoadedForProperty(propertyId));

    const spaces: Space[] = useSelector(selectors.sortedSpacesForProperty(propertyId));

    React.useEffect(() => {
        if (!areLoaded) {
            LocationsAPI.getPropertySpaces(propertyId).then((spacesResponse: LocationsSpace[]) => {
                dispatch({
                    type: LocationsActions.ADD_SPACES,
                    payload: {
                        propertyId,
                        spaces: spacesResponse.map((r) => mapLocationsSpaceToSpace(r)),
                    },
                } as LocationsActionTypes);
            });
        }
    }, [areLoaded]);

    return {
        areLoaded,
        spaces,
    };
};

export default useLocationsSpacesFromState;
