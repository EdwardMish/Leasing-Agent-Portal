import * as React from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';

import { Alert } from '../../../API/Alerts/AlertsTypes/Alert';

import { IconColors } from '../../../Icons';

import { FlexWrapper } from '../../../Shared/FlexWrapper';

const headingStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: IconColors.LightGrey,
    lineHeight: '1.6',
};

const formatExpiration = (expiration: string, isExpired: boolean): string => {
    if (isExpired) return `Expired ${format(new Date(expiration), 'LL/dd/yy')}`;

    const expirationDate = new Date(expiration);
    const now = new Date(Date.now());

    const daysUntil = differenceInDays(expirationDate, now);
    const hoursUntil = differenceInHours(expirationDate, now);

    const hours = hoursUntil - daysUntil * 24;

    if (hours > 0) {
        if (daysUntil > 0) return `Expires in ${daysUntil} days, ${hours} hours`;

        return `Expires in ${hours} hours`;
    }

    return `Expires in ${daysUntil} days`;
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }): React.ReactElement => {
    const { alertMessage, expiration, propertyName } = alert;

    const [isExpired, toggleIsExpired] = React.useState<boolean>(
        isBefore(new Date(expiration), new Date(Date.now())),
    );

    React.useEffect(() => {
        toggleIsExpired(isBefore(new Date(expiration), new Date(Date.now())));
    }, [expiration]);

    return (
        <>
            <p style={headingStyle}>Message</p>
            <p style={{ lineHeight: '1.6', margin: '0 0 0.5rem', fontSize: '1rem' }}>{alertMessage}</p>
            <FlexWrapper align="start" justify="between">
                <div style={{ width: '50%' }}>
                    <p style={headingStyle}>Property</p>
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>{propertyName}</p>
                </div>
                <div style={{ width: '50%' }}>
                    <p style={headingStyle}>Expiration</p>
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                        {formatExpiration(expiration, isExpired)}
                    </p>
                </div>
            </FlexWrapper>
        </>
    );
};

export default AlertItem;
