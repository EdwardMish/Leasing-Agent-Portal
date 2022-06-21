import { PropertyAPI, PropertyTypes } from 'API/Property';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { mapPropertyWithOccupantsResponseToPropertyWithOccupants } from '../../../utils/Mappers';
import { PropertyWithOccupants } from '../../Shared/Types';
import { PropertyTenantResolutionActions } from '../actions';
import * as selectors from '../selectors';

type PropertyAndOccupantsHook = () => {
    propertiesWithOccupantsList: PropertyWithOccupants[];
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
};

export const usePropertiesAndOccupantsFromState: PropertyAndOccupantsHook = () => {
    const dispatch = useDispatch();

    const propertiesWithOccupantsList: PropertyWithOccupants[] = useSelector(selectors.sortedPropertiesWithOccupantsList);
    const loadState: LoadStatus = useSelector(selectors.propertiesWithOccupantsLoadStatus);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: PropertyTenantResolutionActions.LOAD_PROPERTY_TENANT_LIST,
            });

            PropertyAPI.getPropertyTenantResolutionList().then(
                (propertyAndOccupantResponse: PropertyTypes.PropertyTenantResolutionResponse[]) => {
                    dispatch({
                        type: PropertyTenantResolutionActions.SET_PROPERTY_TENANT_LIST,
                        payload: propertyAndOccupantResponse.map((p) =>
                            mapPropertyWithOccupantsResponseToPropertyWithOccupants(p),
                        ),
                    });
                },
            );
        }
    }, [loadState]);

    return {
        propertiesWithOccupantsList,
        areLoaded: loadState === LoadStatus.LOADED,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
    };
};

