import GET from 'API/utils/GET';
import { Occupant } from '../Types/Occupant';

const getSalesOccupants = (): Promise<Occupant[]> => GET.wrapper<Occupant[]>(`${API_ROOT}/sales/occupants`);

export default getSalesOccupants;
