import GET from 'API/utils/GET';
import { FeatureFlag } from '../FeatureFlagsTypes';

const getAllFeatureFlags = (): Promise<FeatureFlag[]> => GET.wrapper(`${API_ROOT}/features`);
export default getAllFeatureFlags;
