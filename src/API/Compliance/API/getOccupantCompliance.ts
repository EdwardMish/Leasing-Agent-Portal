import GET from 'API/utils/GET';
import { OccupantCompliance } from '../Types/OccupantCompliance';

export default (occupantId: number): Promise<OccupantCompliance[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/compliance`);
