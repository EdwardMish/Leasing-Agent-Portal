import { SubscriptionPlanType } from 'State/Subscriptions/Types/SubscriptionPlanType';
import { Subscription } from './Subscription';

export interface SubscriptionPlan {
    subscriptionPlanType: SubscriptionPlanType;
    subscriptions: Subscription[];
}
