import { PropertyAPI, PropertyTypes } from 'API/Property';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyTenantResolution } from '../../State';
import { LoadStatus } from '../../Types';
import { mapPropertyWithOccupantsResponseToPropertyWithOccupants } from '../../utils/Mappers';

const { Actions, selectors } = PropertyTenantResolution;

type PropertyTenantResolutionHook = () => [boolean];

export const usePropertyTenantResolution: PropertyTenantResolutionHook = () => {
    const dispatch = useDispatch();

    const propertiesWithOccupantsLoadStatus: LoadStatus = useSelector(selectors.propertiesWithOccupantsLoadStatus);
    const propertiesWithOccupantsAreLoaded: boolean = useSelector(selectors.propertiesWithOccupantssAreLoaded);

    React.useEffect(() => {
        if (propertiesWithOccupantsLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: Actions.LOAD_PROPERTY_TENANT_LIST,
            } as PropertyTenantResolution.ActionTypes);

            PropertyAPI.getPropertyTenantResolutionList().then(
                (propertiesWithOccupants: PropertyTypes.PropertyTenantResolutionResponse[]) => {
                    dispatch({
                        type: Actions.SET_PROPERTY_TENANT_LIST,
                        payload: propertiesWithOccupants.map((p) =>
                            mapPropertyWithOccupantsResponseToPropertyWithOccupants(p),
                        ),
                    } as PropertyTenantResolution.ActionTypes);
                },
            );
        }
    }, [propertiesWithOccupantsLoadStatus]);

    return [propertiesWithOccupantsAreLoaded];
};

