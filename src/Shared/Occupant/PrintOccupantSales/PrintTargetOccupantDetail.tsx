import * as React from 'react';

import { OccupantSummary } from '../../../Features/Sales/OccupantSummary';
import { months, formatCurrency } from '../../../utils';
import { SalesSubmittal } from '../../../Types';

const styles = require('./print-target-occupant-detail.module.css');

interface PrintTargetOccupantDetailProps {
    salesSubmittals: SalesSubmittal[];
    occupantName: string;
    propertyName: string;
    year: number;
}

export const PrintTargetOccupantDetail: React.FC<PrintTargetOccupantDetailProps> = ({
    occupantName,
    propertyName,
    year,
    salesSubmittals,
}) => (
    <>
        <div className={styles.ScreenView}>
            <OccupantSummary occupantName={occupantName} propertyName={propertyName} />
            <p className={styles.Year}>{year}</p>
            <div className={styles.TableHeading}>
                <p>Month</p>
                <p>Amount</p>
                <p>Status</p>
            </div>
            <ul>
                {
                    Object.keys(months).map((m: string) => {
                        const submittal = salesSubmittals.find((s) => s.month === parseInt(m) && s.year === year);

                        return (
                            <li key={`print-view-${m}`} className={styles.Record}>
                                <p>{months[m]}</p>
                                <p>{submittal ? formatCurrency(submittal.salesAmount, 0.01) : '--'}</p>
                                <p>{submittal ? submittal.status : '--'}</p>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
        <div className={`${styles.PrintTableWrapper} print-target`}>
            <OccupantSummary occupantName={occupantName} propertyName={propertyName} />
            <p className={styles.TableYear}>{year}</p>
            <table className={styles.PrintTable}>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(months).map((m: string) => {
                            const submittal = salesSubmittals.find((s) => s.month === parseInt(m) && s.year === year);

                            return (
                                <tr key={`print-view-${m}`} className={styles.Record}>
                                    <td>{months[m]}</td>
                                    <td>{submittal ? formatCurrency(submittal.salesAmount, 0.01) : '--'}</td>
                                    <td>{submittal ? submittal.status : '--'}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
);
