import * as React from 'react';

import { Alert } from '../../../API/Alerts/AlertsTypes/Alert';

import { IconColors } from '../../../Icons';

import AlertItem from './AlertItem';

const ExpiredAlertItem: React.FC<{ alert: Alert }> = ({ alert }): React.ReactElement => (
    <div
        style={{
            margin: '0 0 0.5rem',
            padding: '1rem 0',
            borderBottom: `1px solid ${IconColors.LightGrey}`,
        }}
    >
        <AlertItem alert={alert} />
    </div>
);

export default ExpiredAlertItem;
