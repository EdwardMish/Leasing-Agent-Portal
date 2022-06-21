import { GET } from 'API/utils';
import Alert from '../AlertsTypes';

const getAlerts = (): Promise<Alert[]> => GET.wrapper<Alert[]>(`${API_ROOT}/alerts`);

export default getAlerts;
