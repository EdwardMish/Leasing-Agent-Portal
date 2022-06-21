import { PATCH } from 'API/utils';

const removeUserRole = (userId: number | string, occupantId: number | string, roleId: number): Promise<void> =>
    PATCH.wrapper<{
        roleId: number;
        occupantId: number | string;
    }>(`${API_ROOT}/tenants/${userId}/remove-occupant-role`, {
        roleId,
        occupantId,
    });

export default removeUserRole;
