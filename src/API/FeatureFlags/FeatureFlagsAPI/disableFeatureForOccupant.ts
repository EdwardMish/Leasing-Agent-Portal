import DELETE from 'API/utils/DELETE';
import { Feature } from '../../../Types';

const disableFeatureForOccupant = (occupantId: number, feature: Feature): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/occupant/${occupantId}/features/${feature}`);

export default disableFeatureForOccupant;
