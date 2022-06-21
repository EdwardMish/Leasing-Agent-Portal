import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { WatcherResponse } from '../RequestsTypes/WatcherResponse';

const getAvailableWatchers = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<WatcherResponse>> =>
    GET.pagedResponse<WatcherResponse>(`${API_ROOT}/requests/watchers`, params);

export default getAvailableWatchers;
