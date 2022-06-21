import { GET } from '../utils';
import { Role, TenantRole } from './Types';

export namespace UserRolesAPI {

    export const getOORoles = (): Promise<Role[]> => GET.wrapper<Role[]>(`${API_ROOT}/owner-operators/roles`);

    export const getTenantRoles = (): Promise<TenantRole[]> => GET.wrapper<TenantRole[]>(`${API_ROOT}/tenants/roles`);
}
