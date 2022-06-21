import { GET } from 'API/utils';
import { BusinessUser } from '../BusinessTypes';

const getBusinessUsers = (occupantId: number | string): Promise<BusinessUser[]> =>
    GET.wrapper<BusinessUser[]>(`${API_ROOT}/business-information/occupants/${occupantId}/users`);

export default getBusinessUsers;
