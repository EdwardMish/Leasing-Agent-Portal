import GET from 'API/utils/GET';
import { Liability } from '../Types/Liability';

const getLiabilities = async (leaseApplicationId: number): Promise<Liability[]> =>
    GET.wrapper<Liability[]>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/liabilities`);
export default getLiabilities;
