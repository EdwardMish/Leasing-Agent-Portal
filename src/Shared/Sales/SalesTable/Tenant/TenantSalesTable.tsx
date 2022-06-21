import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { ArrowRightCircle } from '../../../../Icons';

import { currentUserHasPermissionForOccupant } from '../../../../State/CurrentUser/selectors';

import { SalesSubmittalByMonth, UserPermissions } from '../../../../Types';

import {
    formatCurrency, getCurrentYear, months, parseQueryParam,
} from '../../../../utils';

import { LoadingContent } from '../../../PageElements';
import { SalesYearTabs } from '../../SalesYearTabs';
import { RecordStatus } from '../RecordStatus';
import { useSalesByMonthForYear } from '../useSalesByMonthForYear';

const tableStyles = require('../sales-table.module.css');
const styles = require('./tenant-sales-table.module.css');

interface TenantSalesTableProps {
    occupantId: number | string;
}

export const TenantSalesTable: React.FC<TenantSalesTableProps> = ({ occupantId }) => {
    const { search } = useLocation();

    const defaultYear = !!search && parseQueryParam(search) || getCurrentYear();

    const [year, setYear] = React.useState<number>(defaultYear);

    const [sales, salesAreLoaded] = useSalesByMonthForYear(occupantId, year);

    const canSubmitSales: boolean = useSelector(currentUserHasPermissionForOccupant(UserPermissions.SubmitSales, occupantId));

    const isActionable = (s: SalesSubmittalByMonth): boolean => {
        const date = new Date(year, (parseInt(s.month) - 1), 1);

        const currentDate = new Date(Date.now());

        const isCurrentMonth = date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth();

        const isInFuture = date > currentDate;

        const isOverFiveYears = date < new Date(new Date().setFullYear(new Date().getFullYear() - 5));

        return !isCurrentMonth && !isInFuture && !isOverFiveYears;
    };

    return (
        <>
            {
                salesAreLoaded
                    ? (
                        <>
                            <SalesYearTabs handler={setYear} selectedYear={year} />
                            <div className={`${tableStyles.TableHeading} ${styles.TenantTableHeading}`}>
                                <p>Month</p>
                                <p>Amount</p>
                                <p>Status</p>
                                {
                                    canSubmitSales && <p>Edit</p>
                                }
                            </div>
                            {
                                sales.map((s: SalesSubmittalByMonth) => (
                                    <div className={tableStyles.Record} key={`tenant-sales-${s.month}`}>
                                        {
                                            isActionable(s)
                                                ? (
                                                    <>
                                                        <p className={`${tableStyles.Month} ${styles.TenantMonth}`}>{months[s.month]}</p>
                                                        <p className={styles.TenantAmount}>{`${s.submittal ? formatCurrency(s.submittal.salesAmount, 0.01) : '--'}`}</p>
                                                        <div className={styles.TenantStatus}>
                                                            {
                                                                s.submittal
                                                                    ? <RecordStatus status={s.submittal.status} />
                                                                    : <p>Missing</p>
                                                            }
                                                        </div>
                                                        {
                                                            isActionable(s) && canSubmitSales
                                                    && (
                                                        <>
                                                            {
                                                                s.submittal
                                                                    ? <Link to={`/sales/resubmit/${occupantId}/${year}/${s.month}`}><div className={styles.TenantAction}><ArrowRightCircle /></div></Link>
                                                                    : <Link to={`/sales/submit/${occupantId}/${year}/${s.month}`}><div className={styles.TenantAction}><ArrowRightCircle /></div></Link>
                                                            }
                                                        </>
                                                    )
                                                        }
                                                    </>
                                                )
                                                : <p className={`${tableStyles.Month} ${styles.TenantMonth}`}>{months[s.month]}</p>
                                        }
                                    </div>
                                ))
                            }
                        </>
                    )
                    : <LoadingContent />
            }
        </>
    );
};
