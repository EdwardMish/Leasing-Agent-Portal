import GET from 'API/utils/GET';
import { LocationsOccupantDetail } from '../Types/LocationsOccupantDetail';

const getOccupantDetails = (occupantId: number | string): Promise<LocationsOccupantDetail> =>
    GET.wrapper<LocationsOccupantDetail>(`${API_ROOT}/occupants/${occupantId}`);

export default getOccupantDetails;
