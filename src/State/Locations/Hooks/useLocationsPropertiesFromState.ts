import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocationsAPI, { LocationsProperty } from '../../../API/Locations';

import { LoadStatus } from '../../../Types';

import { PropertyWithOccupants } from '../../Shared/Types/PropertyWithOccupants';

import { LocationsActions, LocationsActionTypes } from '../actions';
import mapLocationsPropertyToPropertyWithOccupants from '../Mappers/mapLocationsPropertyToPropertyWithOccupants';

import * as selectors from '../selectors';

type PropertiesFromStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    properties: PropertyWithOccupants[];
}

const useLocationsPropertiesFromState: PropertiesFromStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.propertiesLoadStatus);

    const properties: PropertyWithOccupants[] = useSelector(selectors.sortedPropertiesList);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: LocationsActions.LOAD_PROPERTIES,
            });

            LocationsAPI.getProperties()
                .then((propertiesResponse: LocationsProperty[]) => {
                    dispatch({
                        type: LocationsActions.SET_PROPERTIES,
                        payload: propertiesResponse.map((p) => mapLocationsPropertyToPropertyWithOccupants(p)),
                    } as LocationsActionTypes);
                })
                .catch((error) => {
                    dispatch({
                        type: LocationsActions.SET_PROPERTIES_ERROR_STATE,
                        payload: {
                            errorMessage: error?.code ? error.code : 'We were not able to load properties.',
                        },
                    } as LocationsActionTypes);
                });
        }
    }, [loadState]);

    return {
        areLoaded: loadState === LoadStatus.LOADED,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
        properties,
    };
};

export default useLocationsPropertiesFromState;
