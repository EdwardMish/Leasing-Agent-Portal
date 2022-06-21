import * as React from 'react';

import { SalesSubmittalStatus } from '../../../../Types';

const tableStyles = require('../sales-table.module.css');

interface RecordErrorProps {
    status?: SalesSubmittalStatus;
}

export const RecordStatus: React.FC<RecordErrorProps> = ({ status }) => {
    if (!status) return <p>--</p>;

    if (status === SalesSubmittalStatus.approved.toLowerCase() || status === SalesSubmittalStatus.approved) {
        return <p className={tableStyles.Approved}>{SalesSubmittalStatus.approved}</p>;
    }

    if (status === SalesSubmittalStatus.pending.toLowerCase() || status === SalesSubmittalStatus.pending) {
        return <p className={tableStyles.Pending}>{SalesSubmittalStatus.pending}</p>;
    }

    if (status === SalesSubmittalStatus.declined.toLowerCase() || status === SalesSubmittalStatus.declined) {
        return <p className={tableStyles.Declined}>{SalesSubmittalStatus.declined}</p>;
    }

    return <p>--</p>;
};
