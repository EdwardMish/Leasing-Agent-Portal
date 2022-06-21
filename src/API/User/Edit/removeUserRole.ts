import axios from 'axios';

export const removeUserRole = (userId: number, userType: string, roleId: number | string): Promise<void> => {
    const url = userType === 'tenant'
        ? `${API_ROOT}/tenants/${userId}/remove-role`
        : `${API_ROOT}/owner-operators/${userId}/remove-role`;

    return new Promise((res, rej) => {
        axios.patch(url, { Role: roleId })
            .then(() => res())
            .catch((error) => rej(error));
    });
};
