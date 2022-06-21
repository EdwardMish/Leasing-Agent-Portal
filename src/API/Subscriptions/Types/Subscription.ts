import { CommunicationChannel } from "State/Subscriptions/Types/CommunicationChannel";

export interface Subscription {
    subscriptionId: number;
    channel: CommunicationChannel;
}
