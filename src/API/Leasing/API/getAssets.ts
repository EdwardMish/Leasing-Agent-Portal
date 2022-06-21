import GET from 'API/utils/GET';
import { Asset } from '../Types/Asset';

const getAssets = async (leaseApplicationId: number): Promise<Asset[]> =>
    GET.wrapper<Asset[]>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/assets`);
export default getAssets;
