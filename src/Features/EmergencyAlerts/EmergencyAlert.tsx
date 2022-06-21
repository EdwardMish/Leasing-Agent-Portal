import * as React from "react";

import { Alert } from "../../API/Alerts/AlertsTypes/Alert";

import { IconColors } from "../../Icons";
import { Button } from "../../Shared/Button";

const EmergencyAlert: React.FC<{ alert: Alert; dismiss: (id: number) => void }> = ({ alert, dismiss }) => (
    <div
        style={{
            padding: "1rem",
            borderRadius: "0.25rem",
            margin: "0 0 1rem",
            background: IconColors.WarningRed,
            color: IconColors.White,
        }}
    >
        <h2 style={{ fontSize: "1.5rem", margin: "0 0 1rem" }}>Emergency Alert</h2>
        <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0 1rem" }}>{`Alert for ${alert.propertyName}`}</h3>
        <p
            style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                margin: "0 0 1rem",
                maxWidth: "40rem",
            }}
        >
            {alert.alertMessage}
        </p>
        <Button
            callback={() => {
                dismiss(alert.alertId);
            }}
            text="Dismiss"
            inverse
            warning
            reverse
        />
    </div>
);

export default EmergencyAlert;
