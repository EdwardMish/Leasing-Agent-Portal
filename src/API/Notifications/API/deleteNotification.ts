import DELETE from 'API/utils/DELETE';

const deleteNotification = (id: number): Promise<void> => DELETE.wrapper(`${API_ROOT}/notifications/${id}/delete`);

export default deleteNotification;
