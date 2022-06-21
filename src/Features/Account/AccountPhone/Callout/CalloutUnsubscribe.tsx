import API from 'API/Subscriptions/API';
import * as React from 'react';
import { IconColors } from '../../../../Icons';
import { Button } from '../../../../Shared/Button';
import { CommunicationChannel, SubscriptionPlanType } from '../../../../State/Subscriptions/Types';

interface CalloutUnsubscribeProps {
    refreshCallback: () => void;
}

const CalloutUnsubscribe: React.FC<CalloutUnsubscribeProps> = ({ refreshCallback }) => {
    const handleUnsubscribe = async () => {
        await API.removeSubscription(SubscriptionPlanType.EmergencyAlerts, CommunicationChannel.SMS);

        refreshCallback();
    };

    return (
        <div style={{ margin: '1rem 0' }}>
            <h3
                style={{
                    color: IconColors.WarningRed,
                    margin: '0 0 0.5rem',
                }}
            >
                Emergency Alerts
            </h3>
            <p
                style={{
                    fontSize: '0.875rem',
                    color: IconColors.DarkGrey,
                    margin: '0 0 1rem',
                    lineHeight: '1.5rem',
                }}
            >
                You are currently subscribed to receive Emergency Alerts
            </p>
            <Button callback={handleUnsubscribe} text="Unsubscribe" />
        </div>
    );
};

export default CalloutUnsubscribe;
