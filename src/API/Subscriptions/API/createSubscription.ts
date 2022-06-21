import POST from "API/utils/POST";
import { CommunicationChannel } from "State/Subscriptions/Types/CommunicationChannel";
import { SubscriptionPlanType } from "State/Subscriptions/Types/SubscriptionPlanType";

const createSubscription = (planType: SubscriptionPlanType, channel: CommunicationChannel): Promise<void> =>
    POST.wrapper(`${API_ROOT}/subscriptions/${planType}/channel/${channel}`, {});

export default createSubscription;
