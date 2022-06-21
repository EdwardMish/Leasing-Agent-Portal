import axios from 'axios';

export const removeUserOccupant = (userId: number | string, occupantId: number): Promise<void> => new Promise((res, rej) => {
    axios.patch(`${API_ROOT}/tenants/${userId}/remove-occupant`, { occupantId }, { headers: { 'Content-Type': 'application/json' } })
        .then(() => res())
        .catch((error) => rej(error));
});
