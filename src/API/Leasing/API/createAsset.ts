import POST from 'API/utils/POST';
import { Asset } from '../Types/Asset';

const createAsset = async (leaseApplicationId: number, values: Asset): Promise<number> =>
    POST.postFormData<Asset, number>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/assets`, values);

export default createAsset;
