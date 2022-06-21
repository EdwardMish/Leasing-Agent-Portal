import * as React from 'react';
import { useDispatch } from 'react-redux';
import isAfter from 'date-fns/isAfter';

import API from '../../../API/Alerts';
import { Alert } from '../../../API/Alerts/AlertsTypes/Alert';

import { globalMessageActionCreators } from '../../../State';

import { IconColors } from '../../../Icons';

import DynamicContent from '../../../Shared/PageElements/DynamicContent';

import ActiveAlertItem from './ActiveAlertItem';
import ExpiredAlertItem from './ExpiredAlertItem';

const AlertsList: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    const [alerts, setAlerts] = React.useState<Alert[]>([]);
    const [expiredAlerts, setExpiredAlerts] = React.useState<Alert[]>([]);
    const [activeAlerts, setActiveAlerts] = React.useState<Alert[]>([]);
    const [alertsLoaded, toggleAlertsLoaded] = React.useState<boolean>(false);

    const getAlerts = () => {
        API.getAlerts()
            .then((alertsResponse: Alert[]) => {
                setAlerts(alertsResponse);
                toggleAlertsLoaded(true);
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage('We could not load alerts', `${err}`));
            });
    };

    React.useEffect(() => {
        getAlerts();
    }, []);

    React.useEffect(() => {
        setActiveAlerts(
            alerts.filter((alert: Alert) => isAfter(new Date(alert.expiration), new Date(Date.now()))),
        );
        setExpiredAlerts(
            alerts.filter((alert: Alert) => !isAfter(new Date(alert.expiration), new Date(Date.now()))),
        );
    }, [alerts]);

    return (
        <DynamicContent
            loaded={alertsLoaded}
            noContent={alerts.length < 1}
            noContentMessage="No Emergency Alerts"
        >
            {!!activeAlerts.length && (
                <>
                    <h2
                        style={{
                            fontSize: '1.1rem',
                            margin: '0.5rem 0 0.75rem',
                            color: IconColors.WarningRed,
                        }}
                    >
                        Active Alert Management
                    </h2>
                    <p style={{ margin: '0 0 0.5rem', lineHeight: '1.6' }}>
                        When a message is created using the Emergency Alert System, an alert will display on
                        all pages for all affected users.
                    </p>
                    <p style={{ margin: '0 0 1rem', lineHeight: '1.6' }}>
                        By default, these alerts last 24 hours. You are able to extend this display or set to
                        expire immediately, removing the alert from affected users.
                    </p>
                    {activeAlerts.map((alert: Alert) => (
                        <ActiveAlertItem
                            key={`alert-list-${alert.alertId}`}
                            alert={alert}
                            refreshCallback={getAlerts}
                        />
                    ))}
                </>
            )}
            {!!expiredAlerts.length && (
                <>
                    <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Expired Alerts</h2>
                    {expiredAlerts.map((alert: Alert) => (
                        <ExpiredAlertItem key={`alert-list-${alert.alertId}`} alert={alert} />
                    ))}
                </>
            )}
        </DynamicContent>
    );
};

export default AlertsList;
