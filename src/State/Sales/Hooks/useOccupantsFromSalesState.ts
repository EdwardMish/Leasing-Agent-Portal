import getSalesOccupants from 'API/Sales/API/getSalesOccupants';
import { Occupant as SalesOccupant } from 'API/Sales/Types/Occupant';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { SalesActions, SalesActionTypes } from '../actions';
import * as selectors from '../selectors';
import { Occupant } from '../Types';

type SalesStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    occupants: Occupant[];
};

export const useOccupantsFromSalesState: SalesStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.salesOccupantsLoadStatus);

    const occupants: Occupant[] = useSelector(selectors.salesOccupantsList);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE || loadState === LoadStatus.ERROR) {
            dispatch({
                type: SalesActions.LOAD_SALES_OCCUPANTS,
            });

            getSalesOccupants().then((occupants: SalesOccupant[]) => {
                dispatch({
                    type: SalesActions.SET_SALES_OCCUPANTS,
                    payload: occupants.map(
                        (_) =>
                            ({
                                id: _.occupantId,
                                name: _.occupantName,
                                propertyId: _.propertyId,
                                propertyName: _.propertyName,
                            } as Occupant),
                    ),
                } as SalesActionTypes);
            });
            //.catch((error) => {
            //    dispatch({
            //        type: SalesActions.SET_SALES_OCCUPANTS_ERROR_STATE,
            //        payload: {
            //            errorMessage: !!(error?.code) ? error.code : 'We were not able to load occupants for sales.'
            //        }
            //    })
            //})
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

