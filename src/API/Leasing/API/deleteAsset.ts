import DELETE from 'API/utils/DELETE';
import { Asset } from '../Types/Asset';

const deleteAsset = async (leaseApplicationId: number, asset: Asset): Promise<void> =>
    DELETE.wrapper<Asset>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/assets/${asset.id}`, asset);

export default deleteAsset;
