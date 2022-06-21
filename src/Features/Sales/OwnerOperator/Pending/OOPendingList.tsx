import getPendingSales from 'API/Sales/API/getPendingSales';
import * as React from 'react';
import { PendingSalesSubmittal } from 'Types/Sales/PendingSalesSubmittal';
import { LoadingContent, NoContent } from '../../../../Shared/PageElements';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { PendingItem } from './PendingItem';

const styles = require('./oo-pending-list.module.css');

export const OOPendingList: React.FC<{}> = () => {
    const [submittalsLoaded, toggleSubmittalsLoad] = React.useState<boolean>(false);
    const [pendingSalesSubmittals, setPendingSalesSubmittals] = React.useState<PendingSalesSubmittal[]>([]);

    React.useEffect(() => {
        getPendingSales().then((res) => {
            toggleSubmittalsLoad(true);
            setPendingSalesSubmittals(res);
        });
    }, []);

    const removeListItem = (occupantId: number, year: number, month: number) => {
        const itemIndex = pendingSalesSubmittals.findIndex(
            (item: PendingSalesSubmittal) => item.occupantId === occupantId && item.year === year && item.month === month,
        );

        if (itemIndex > -1) {
            setPendingSalesSubmittals([
                ...pendingSalesSubmittals.slice(0, itemIndex),
                ...pendingSalesSubmittals.slice(itemIndex + 1),
            ]);
        }
    };

    return (
        <PageWrapper pageTitle="Sales | Pending">
            <h1>Pending Sales</h1>
            {submittalsLoaded ? (
                <>
                    <div className={styles.OOPendingList}>
                        <p>Neighbor &amp; Property</p>
                        <p>Date</p>
                        <p>Amount</p>
                        <p className={styles.OOPendingListNotes}>Notes</p>
                    </div>
                    {pendingSalesSubmittals.length > 0 ? (
                        <>
                            {pendingSalesSubmittals.map((p: PendingSalesSubmittal) => (
                                <PendingItem
                                    key={`${p.occupantId}-${p.year}-${p.month || 'month'}`}
                                    pendingSubmittal={p}
                                    removeItem={removeListItem}
                                />
                            ))}
                        </>
                    ) : (
                        <NoContent message="There are currently no submissions to review" />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};

