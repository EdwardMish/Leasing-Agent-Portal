import GET from 'API/utils/GET';
import { Occupant } from '../OccupantTypes/Occupant';

const getOccupant = (occupantId: number | string): Promise<Occupant> =>
    GET.wrapper<Occupant>(`${API_ROOT}/occupants/${occupantId}`);

export default getOccupant;
