import axios from 'axios';

export const removeNotificationPreference = (userId: number | string, preferenceId: string): Promise<void> => new Promise((res, rej) => {
    axios.patch(
        `${API_ROOT}/users/${userId}/remove-notification-preference`,
        { NotificationType: preferenceId },
        { headers: { 'Content-Type': 'application/json' } },
    )
        .then(() => res())
        .catch((error) => rej(error));
});
