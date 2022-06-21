import axios from 'axios';
import { UserTypes } from '../../../Types';

export const addUserRole = (userId: number, userType: UserTypes, roleId: number | string): Promise<void> => {
    const url = userType === UserTypes.Tenant
        ? `${API_ROOT}/tenants/${userId}/add-role`
        : `${API_ROOT}/owner-operators/${userId}/add-role`;

    return new Promise((res, rej) => {
        axios.patch(url, { Role: roleId }, { headers: { 'Content-Type': 'application/json' } })
            .then(() => res())
            .catch((error) => rej(error));
    });
};
