import GET from 'API/utils/GET';
import { HistoryResponse } from '../RequestsTypes/HistoryResponse';

const getHistory = (requestid: string | number): Promise<HistoryResponse[]> =>
    GET.wrapper(`${API_ROOT}/requests/${requestid}/history`);

export default getHistory;
