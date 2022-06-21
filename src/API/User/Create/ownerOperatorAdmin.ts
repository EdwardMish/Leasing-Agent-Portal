import axios from 'axios';

export const createOwnerOperatorAdmin = (user): Promise<{ userId: number } | undefined> => new Promise((res, rej) => {
    axios.post(`${API_ROOT}/owner-operator-admins`, user, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => res(response?.data))
        .catch((error) => rej(error));
});
