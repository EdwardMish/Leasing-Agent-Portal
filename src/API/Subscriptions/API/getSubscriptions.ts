import GET from "API/utils/GET";
import { SubscriptionPlan } from "../Types/SubscriptionPlan";

const getSubscriptions = (): Promise<SubscriptionPlan[]> => GET.wrapper<SubscriptionPlan[]>(`${API_ROOT}/subscriptions`);

export default getSubscriptions;
