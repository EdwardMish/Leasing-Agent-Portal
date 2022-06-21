import { PATCH } from 'API/utils';

const addUserRole = (userId: number | string, occupantId: number | string, roleId: number): Promise<void> =>
    PATCH.wrapper<{
        roleId: number;
        occupantId: number | string;
    }>(`${API_ROOT}/tenants/${userId}/add-occupant-role`, { roleId, occupantId });

export default addUserRole;
