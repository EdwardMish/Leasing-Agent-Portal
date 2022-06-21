import GET from 'API/utils/GET';
import { NotificationDetail } from '../Types/NotificationDetail';

const getDetail = (notificationId: number): Promise<NotificationDetail> =>
    GET.wrapper<NotificationDetail>(`${API_ROOT}/notifications/${notificationId}`);

export default getDetail;
