/**
 * DESCRIPTION: This component loads the sales for the occupant specific in the URL parameter
 *              "occupantId".
 *
 * AUTHOR(S): Jim Merritt
 */

import getOccupantSales from 'API/Occupant/OccupantAPI/getOccupantSales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Sales } from '../../../../State';
import { SalesSubmittal } from '../../../../Types';

interface LoadOccupantSalesStateProps {
    children: React.ReactElement;
}

const { selectors, Actions } = Sales;

export const LoadOccupantSalesState: React.FC<LoadOccupantSalesStateProps> = ({ children }) => {
    const dispatch = useDispatch();

    let { occupantId } = useParams<{ occupantId: string }>();

    const loadedOccupants: number[] = useSelector(selectors.loadedOccupants);

    React.useEffect(() => {
        if (!!occupantId) {
            if (!loadedOccupants.includes(parseInt(occupantId))) {
                dispatch({
                    type: Actions.LOAD_OCCUPANT_SALES,
                    payload: parseInt(occupantId),
                });

                getOccupantSales(occupantId).then((res: SalesSubmittal[]) => {
                    dispatch({
                        type: Actions.SET_OCCUPANT_SALES,
                        payload: {
                            submittals: res,
                            occupantId: parseInt(occupantId),
                        },
                    });
                });
            }
        }
    }, [loadedOccupants, occupantId]);

    return children;
};

