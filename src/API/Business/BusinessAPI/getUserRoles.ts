import { GET } from 'API/utils';
import { Role } from '../BusinessTypes';

const getUserRoles = (): Promise<Role[]> => GET.wrapper<Role[]>(`${API_ROOT}/tenants/roles`);

export default getUserRoles;
