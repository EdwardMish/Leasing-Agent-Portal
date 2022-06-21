import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { RequestResponse } from '../RequestsTypes/RequestResponse';

const getAllRequests = (params: PagedSortedFilteredRequestParams): Promise<RequestResponse[]> =>
    GET.pagedResponseResults<RequestResponse>(`${API_ROOT}/requests`, params);

export default getAllRequests;
