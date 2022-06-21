import { API as BusinessAPI, Types as BusinessTypes } from 'API/Business';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { BusinessActions, BusinessActionTypes } from '../actions';
import { mapBusinessAPIOccupantToOccupant } from '../Mappers/mapBusinessAPIOccupantToOccupant';
import * as selectors from '../selectors';
import { Occupant } from '../Types/Occupant';

type BusinessOccupantsFromStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    occupants: Occupant[];
};

export const useBusinessOccupantsFromState: BusinessOccupantsFromStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.occuapantsLoadStatus);
    const occupants: Occupant[] = useSelector(selectors.sortedOccupantsList);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: BusinessActions.LOAD_BUSINESS_OCCUPANTS,
            });

            BusinessAPI.getOccupants()
                .then((occupants) => {
                    dispatch({
                        type: BusinessActions.SET_BUSINESS_OCCUPANTS,
                        payload: occupants.map((o: BusinessTypes.Occupant) => mapBusinessAPIOccupantToOccupant(o)),
                    } as BusinessActionTypes);
                })
                .catch((error) => {
                    dispatch({
                        type: BusinessActions.SET_BUSINESS_OCCUPANTS_ERROR_STATE,
                        payload: {
                            errorMessage: !!error?.code
                                ? error.code
                                : 'We were not able to load your business information at this time.',
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
        occupants,
    };
};

