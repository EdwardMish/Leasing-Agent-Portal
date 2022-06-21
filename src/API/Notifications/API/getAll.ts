import GET from 'API/utils/GET';
import { PagedSortedFilteredRequestParams } from '../../Shared/PagedSortedFilteredRequest';
import { NotificationSummary } from '../Types/NotificationSummary';

const getAll = (params: PagedSortedFilteredRequestParams): Promise<NotificationSummary[]> =>
    GET.pagedResponseResults<NotificationSummary>(`${API_ROOT}/notifications`, params);

export default getAll;
