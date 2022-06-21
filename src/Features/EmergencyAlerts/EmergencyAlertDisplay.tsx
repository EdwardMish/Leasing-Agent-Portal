import * as React from "react";
import isAfter from "date-fns/isAfter";
import { useSelector } from "react-redux";

import API from "../../API/Alerts";
import { Alert } from "../../API/Alerts/AlertsTypes/Alert";

import { selectors } from "../../State/Alerts";

import EmergencyAlert from "./EmergencyAlert";

const EmergencyAlertDisplay: React.FC = () => {
    const [alerts, setAlerts] = React.useState<Alert[]>([]);
    const [dismissed, setDismissed] = React.useState<number[]>([]);
    const [previousCount, setPreviousCount] = React.useState<number>(0);

    const alertsState: string[] = useSelector(selectors.alerts);

    const getAlerts = async () => {
        const alertsResponse: Alert[] = await API.getAlerts();

        if (!!alertsResponse.length)
            setAlerts(
                alertsResponse
                    .filter((alert: Alert) => !dismissed.includes(alert.alertId))
                    .filter((alert: Alert) => isAfter(new Date(alert.expiration), new Date(Date.now()))),
            );
    };

    React.useEffect(() => {
        getAlerts();
    }, []);

    React.useEffect(() => {
        if (alertsState.length > previousCount) {
            getAlerts();

            setPreviousCount(alertsState.length);
        }
    }, [alertsState]);

    const handleDismissal = (id: number): void => {
        const alertIndex = alerts.findIndex((alert: Alert) => alert.alertId === id);

        if (alertIndex > -1) {
            setDismissed([...dismissed, alerts[alertIndex].alertId]);

            setAlerts([...alerts.slice(0, alertIndex), ...alerts.slice(alertIndex + 1)]);
        }
    };

    return (
        <>
            {alerts.map((alert) => (
                <EmergencyAlert
                    key={`emergency-alerts-${alert.alertId}`}
                    alert={alert}
                    dismiss={handleDismissal}
                />
            ))}
        </>
    );
};

export default EmergencyAlertDisplay;
