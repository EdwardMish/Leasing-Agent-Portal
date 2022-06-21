import GET from 'API/utils/GET';
import { LocationsOccupantUser } from '../Types/LocationsOccupantUser';

const getOccupantsOfUsers = (occupantId: number | string): Promise<LocationsOccupantUser[]> =>
    GET.wrapper(`${API_ROOT}/locations/occupants/${occupantId}/users`);

export default getOccupantsOfUsers;
