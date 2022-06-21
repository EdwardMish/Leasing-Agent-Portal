import axios from 'axios';

export const disableUser = (userId: number): Promise<void> => new Promise((res, rej) => {
    axios.patch(`${API_ROOT}/users/${userId}/disable`, {}, { headers: { 'Content-Type': 'application/json' } })
        .then(() => res())
        .catch((error) => rej(error));
});
