import POST from 'API/utils/POST';
import { Feature } from '../../../Types';

const enableFeatureForOccupant = (occupantId: number, feature: Feature): Promise<void> =>
    POST.wrapper(`${API_ROOT}/occupant/${occupantId}/features/${feature}`);

export default enableFeatureForOccupant;
