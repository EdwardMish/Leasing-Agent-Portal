import { GET } from 'API/utils';
import { Occupant } from '../BusinessTypes/Occupant';

const getOccupants = (): Promise<Occupant[]> => GET.wrapper<Occupant[]>(`${API_ROOT}/business-information/occupants`);

export default getOccupants;
