import axios from 'axios';

export const createTenantWithOccupants = ({
    firstName,
    lastName,
    email,
    occupantIds,
}: {
    firstName: string;
    lastName: string;
    email: string;
    occupantIds: number[];
}): Promise<{ userId: number } | undefined> => new Promise((res, rej) => {
    axios.post(`${API_ROOT}/tenants-with-occupants`, {
        firstName,
        lastName,
        email,
        occupantIds,
    }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => res(response?.data))
        .catch((error) => rej(error));
});
