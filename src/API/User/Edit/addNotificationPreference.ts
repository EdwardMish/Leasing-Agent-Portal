import axios from 'axios';

export const addNotificationPreference = (userId: number | string, preferenceId: string): Promise<void> => new Promise((res, rej) => {
    axios.patch(
        `${API_ROOT}/users/${userId}/add-notification-preference`,
        { NotificationType: preferenceId },
        { headers: { 'Content-Type': 'application/json' } },
    )
        .then(() => res())
        .catch((error) => rej(error));
});
