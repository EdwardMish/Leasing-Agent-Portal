import axios from 'axios';

export const enableUser = (userId: number): Promise<void> => new Promise((res, rej) => {
    axios.patch(`${API_ROOT}/users/${userId}/enable`, {}, { headers: { 'Content-Type': 'application/json' } })
        .then(() => res())
        .catch((error) => rej(error));
});
