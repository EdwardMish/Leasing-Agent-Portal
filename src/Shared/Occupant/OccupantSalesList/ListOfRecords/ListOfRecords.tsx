import getOccupantSales from 'API/Occupant/OccupantAPI/getOccupantSales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sales } from '../../../../State';
import { SalesSubmittal, SalesSubmittalByMonth } from '../../../../Types';
import { months } from '../../../../utils';
import { RecordMissing } from './RecordMissing';
import RecordPresent from './RecordPresent/RecordPresent';

const styles = require('./list-of-records.module.css');

interface ListOfRecordsProps {
    occupantId: number | string;
    year: number;
}

const { selectors, Actions } = Sales;

export const ListOfRecords: React.FC<ListOfRecordsProps> = ({ occupantId, year }) => {
    const dispatch = useDispatch();

    const salesForOccupantAreLoaded: boolean = useSelector(selectors.salesForOccupantAreLoaded(occupantId));
    const loadedOccupants: number[] = useSelector(selectors.loadedOccupants);
    const salesSubmittals: SalesSubmittalByMonth[] = useSelector(selectors.occupantSalesByMonth(occupantId, year));

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

    return (
        <>
            {salesForOccupantAreLoaded && (
                <>
                    <div className={styles.TableHeading}>
                        <p>Month</p>
                        <p>Amount</p>
                        <p>Status</p>
                    </div>
                    {salesSubmittals.map((s: SalesSubmittalByMonth) =>
                        s.hasOwnProperty('submittal') && !!s.submittal ? (
                            <RecordPresent
                                key={`record-present-${s.month}`}
                                month={months[s.month]}
                                occupantId={occupantId}
                                salesSubmittal={s.submittal}
                            />
                        ) : (
                            <RecordMissing
                                key={`record-missing-${s.month}`}
                                month={s.month}
                                occupantId={occupantId}
                                year={year}
                            />
                        ),
                    )}
                </>
            )}
        </>
    );
};

