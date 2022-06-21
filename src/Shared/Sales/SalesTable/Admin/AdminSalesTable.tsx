import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSalesByMonthForYear } from '../useSalesByMonthForYear';
import { parseQueryParam, getCurrentYear, months } from '../../../../utils';
import { SalesYearTabs } from '../../SalesYearTabs';
import { SalesSubmissionFrequency, SalesSubmittalByMonth, UserRoles, UserRolesDisplayName } from '../../../../Types';
import { LoadingContent } from '../../../PageElements';
import { AdminSalesRow } from './AdminSalesRow';
import { CurrentUserState, Occupants } from '../../../../State';

const tableStyles = require('../sales-table.module.css');
const styles = require('./admin-sales-table.module.css');

type Occupant = Occupants.Types.Occupant;

interface AdminSalesTableProps {
    occupant: Occupant;
}

export const AdminSalesTable: React.FC<AdminSalesTableProps> = ({ occupant }) => {
    const { search } = useLocation();

    const defaultYear = (!!search && parseQueryParam(search)) || getCurrentYear();

    const currentUserHasRoles: boolean = useSelector(
        CurrentUserState.selectors.currentUserHasRoles([
            { id: UserRoles.OOAdmin, name: UserRolesDisplayName[UserRoles.OOAdmin] },
            { id: UserRoles.OOSalesCoordinator, name: UserRolesDisplayName[UserRoles.OOSalesCoordinator] },
        ])
    );

    // TODO: Find a better place for this, was in object through mapper
    const canRequestSales: boolean =
        occupant.salesSubmissionFrequency === SalesSubmissionFrequency.monthly ||
        occupant.salesSubmissionFrequency === SalesSubmissionFrequency.yearly;

    const [year, setYear] = React.useState<number>(defaultYear);
    const [canAdmin, setCanAdmin] = React.useState<boolean>(false);

    const [salesByMonth, salesAreLoaded] = useSalesByMonthForYear(occupant.id, year);

    React.useEffect(() => {
        setCanAdmin(currentUserHasRoles);
    }, [currentUserHasRoles]);

    return (
        <>
            {salesAreLoaded ? (
                <>
                    <SalesYearTabs handler={setYear} selectedYear={year} />
                    <div className={`${tableStyles.TableHeading} ${styles.AdminTableHeading}`}>
                        <p className={styles.OOHeaderMonth}>Month</p>
                        <p className={styles.OOHeaderAmount}>Amount</p>
                        {canAdmin && <p className={styles.OOHeaderActions}>Actions</p>}
                        <p className={styles.OOHeaderStatus}>Status</p>
                        <p className={styles.OOHeaderNotes}>Notes</p>
                        <p className={styles.OOHeaderDetailsIcon} />
                    </div>
                    {salesByMonth.map((s: SalesSubmittalByMonth) =>
                        new Date(year, parseInt(s.month) - 1, 1) > new Date(Date.now()) ? (
                            <div className={tableStyles.Record} key={`tenant-sales-${s.month}`}>
                                <p className={`${tableStyles.Month} ${styles.AdminMonth}`}>{months[s.month]}</p>
                            </div>
                        ) : (
                            <AdminSalesRow
                                key={`admin-sales-row-${year}-${s.month}`}
                                occupantId={occupant.id}
                                submittalByMonth={s}
                                year={year}
                                canAdmin={canAdmin}
                                canRequestSales={canRequestSales}
                            />
                        )
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
