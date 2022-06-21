import GET from 'API/utils/GET';
import { Message } from '../Types';

const getMessages = async (leaseApplicationId: number): Promise<Message[]> =>
    GET.wrapper<Message[]>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/messages`);
export default getMessages;
