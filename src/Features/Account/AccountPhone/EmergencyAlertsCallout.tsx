import API from 'API/Subscriptions/API';
import { Subscription } from 'API/Subscriptions/Types/Subscription';
import { SubscriptionPlan } from 'API/Subscriptions/Types/SubscriptionPlan';
import * as React from 'react';
import { CommunicationChannel, SubscriptionPlanType } from '../../../State/Subscriptions/Types';
import { Phone, PhoneType } from '../../../Types/User';
import CalloutSubscribe from './Callout/CalloutSubscribe';
import CalloutUnsubscribe from './Callout/CalloutUnsubscribe';

interface EmergencyAlertsCalloutProps {
    phoneNumbers: Phone[];
    refresh: () => void;
}

const getMobile = (phones: Phone[]): string => {
    const mobile = phones.filter((phone) => phone.phoneType === PhoneType.Mobile);

    if (mobile[0]) return mobile[0].phoneNumber;

    return '';
};

const EmergencyAlertsCallout: React.FC<EmergencyAlertsCalloutProps> = ({ phoneNumbers, refresh }) => {
    const [hideCallout, toggleHideCallout] = React.useState<boolean>(false);
    const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
    const [subscriptionsLoaded, toggleSubscriptionsLoaded] = React.useState<boolean>(false);

    const setSubs = () =>
        API.getSubscriptions()
            .then((plans: SubscriptionPlan[]) => {
                setSubscriptions(
                    plans
                        .filter((plan) => plan.subscriptionPlanType === SubscriptionPlanType.EmergencyAlerts)
                        .map(({ subscriptions: subscriptionList }) => subscriptionList)
                        .reduce((agg, subs) => [...agg, ...subs], [])
                        .filter((sub: Subscription) => sub.channel === CommunicationChannel.SMS),
                );

                toggleSubscriptionsLoaded(true);
            })
            .catch(() => {
                toggleSubscriptionsLoaded(true);
            });

    React.useEffect(() => {
        setSubs();
    }, []);

    const hideCallback = () => {
        toggleHideCallout(true);
    };

    return (
        <>
            {!hideCallout && subscriptionsLoaded && (
                <>
                    {subscriptions.length ? (
                        <CalloutUnsubscribe refreshCallback={setSubs} />
                    ) : (
                        <CalloutSubscribe
                            currentPhone={getMobile(phoneNumbers)}
                            refreshCallback={setSubs}
                            refreshPhones={refresh}
                            hideCallback={hideCallback}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default EmergencyAlertsCallout;
