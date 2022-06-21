import * as React from 'react';
import { SalesSubmittalStatus } from '../../../../../../Types';

interface OOActionsProps {
    approve: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    decline: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    status?: SalesSubmittalStatus | undefined;
}

const listStyles = require('../../list-of-records.module.css');

export const OOActions: React.FC<OOActionsProps> = ({ approve, decline, status }) => {
    if (!status) return <p />;

    if (status.toLowerCase() === SalesSubmittalStatus.approved.toLowerCase()) return <p className={listStyles.ApprovedText}>Approved</p>;

    if (status.toLowerCase() === SalesSubmittalStatus.declined.toLowerCase()) return <p className={listStyles.DeclineText}>Declined</p>;

    if (status.toLowerCase() === SalesSubmittalStatus.pending.toLowerCase()) {
        return (
            <div className={listStyles.OOActions}>
                <button className={listStyles.ButtonComplete} onClick={approve}>Approve</button>
                <button className={listStyles.ButtonDecline} onClick={decline}>Decline</button>
            </div>
        );
    }

    return <p />;
};
