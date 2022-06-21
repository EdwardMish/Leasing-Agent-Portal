import DELETE from 'API/utils/DELETE';
import { CommunicationChannel } from 'State/Subscriptions/Types/CommunicationChannel';
import { SubscriptionPlanType } from 'State/Subscriptions/Types/SubscriptionPlanType';

const removeSubscription = (planType: SubscriptionPlanType, channel: CommunicationChannel): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/subscriptions/${planType}/channel/${channel}`, {});

export default removeSubscription;
