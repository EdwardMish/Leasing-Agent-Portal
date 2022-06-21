import axios from 'axios';

export const toggleUserProperty = (userId: number | string, propertyId: number, selectedPropertyIds: number[]): Promise<void> => {
    const url = selectedPropertyIds.includes(propertyId)
        ? `${API_ROOT}/owner-operators/${userId}/remove-property`
        : `${API_ROOT}/owner-operators/${userId}/add-property`;

    return new Promise((res, rej) => {
        axios.patch(url, { propertyId }, { headers: { 'Content-Type': 'application/json' } })
            .then(() => res())
            .catch((error) => rej(error));
    });
};
