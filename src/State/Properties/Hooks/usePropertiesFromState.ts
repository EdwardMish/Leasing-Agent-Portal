import { PropertyAPI, PropertyTypes } from 'API/Property';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { mapPropertyResponseToProperty } from '../../../utils/Mappers';
import { Property } from '../../Shared/Types';
import { PropertyActions, PropertyActionTypes } from '../actions';
import * as selectors from '../selectors';

type PropertiesFromStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    properties: Property[];
};

export const usePropertiesFromState: PropertiesFromStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.propertiesLoadStatus);

    const properties: Property[] = useSelector(selectors.properties);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: PropertyActions.LOAD_PROPERTIES,
            });

            PropertyAPI.getAllProperties()
                .then((properties: PropertyTypes.PropertyResponse[]) => {
                    dispatch({
                        type: PropertyActions.SET_PROPERTIES,
                        payload: properties.map((p) => mapPropertyResponseToProperty(p)),
                    } as PropertyActionTypes);
                })
                .catch((error) => {
                    dispatch({
                        type: PropertyActions.SET_PROPERTIES_ERROR_STATE,
                        payload: {
                            errorMessage: !!error?.code ? error.code : 'We were not able to load properties.',
                        },
                    });
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

