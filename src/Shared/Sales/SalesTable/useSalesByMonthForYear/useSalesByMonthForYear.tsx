import getOccupantSales from 'API/Occupant/OccupantAPI/getOccupantSales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sales } from '../../../../State';
import { SalesSubmittal, SalesSubmittalByMonth } from '../../../../Types';

type SalesByMonthForYearHook = (occupantId: number | string, year: number) => [SalesSubmittalByMonth[], boolean];

const { selectors, Actions } = Sales;

export const useSalesByMonthForYear: SalesByMonthForYearHook = (occupantId, year) => {
    const dispatch = useDispatch();

    const salesForOccupantAreLoaded: boolean = useSelector(selectors.salesForOccupantAreLoaded(occupantId));
    const loadedOccupants: number[] = useSelector(selectors.loadedOccupants);
    const salesSubmittalsByMonth: SalesSubmittalByMonth[] = useSelector(selectors.occupantSalesByMonth(occupantId, year));

    React.useEffect(() => {
        const id: number = typeof occupantId === 'string' ? parseInt(occupantId) : occupantId;

        if (!loadedOccupants.includes(id)) {
            dispatch({
                type: Actions.LOAD_OCCUPANT_SALES,
                payload: id,
            });

            getOccupantSales(id).then((res: SalesSubmittal[]) => {
                dispatch({
                    type: Actions.SET_OCCUPANT_SALES,
                    payload: {
                        submittals: res,
                        occupantId: id,
                    },
                });
            });
        }
    }, [loadedOccupants, occupantId]);

    return [salesSubmittalsByMonth, salesForOccupantAreLoaded];
};

