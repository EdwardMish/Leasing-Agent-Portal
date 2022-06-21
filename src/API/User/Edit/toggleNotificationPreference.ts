import axios from 'axios';

export const toggleNotificationPreference = (userId: number | string, preferenceId: string, activeTypes: string[]): Promise<void> => {
    const url = activeTypes.includes(preferenceId)
        ? `${API_ROOT}/users/${userId}/remove-notification-preference`
        : `${API_ROOT}/users/${userId}/add-notification-preference`;

    return new Promise((res, rej) => {
        axios.patch(url, { preferenceId }, { headers: { 'Content-Type': 'application/json' } })
            .then(() => res())
            .catch((error) => rej(error));
    });
};
