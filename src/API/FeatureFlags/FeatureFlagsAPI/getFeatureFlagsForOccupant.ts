import GET from 'API/utils/GET';
import { FeatureFlag } from '../../../Types';

const getFeatureFlagsForOccupant = (occupantId: number): Promise<FeatureFlag[]> =>
    GET.wrapper(`${API_ROOT}/occupant/${occupantId}/features`);

export default getFeatureFlagsForOccupant;
