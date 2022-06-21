import DELETE from 'API/utils/DELETE';

const deleteAllNotifications = (): Promise<void> => DELETE.wrapper(`${API_ROOT}/notifications/delete-all`);

export default deleteAllNotifications;
