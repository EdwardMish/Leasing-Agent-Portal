import GET from 'API/utils/GET';

const getUnreadNotificationsCount = (): Promise<{
    count: number;
}> => GET.wrapper(`${API_ROOT}/notifications/unread/count`);

export default getUnreadNotificationsCount;
