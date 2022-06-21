import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { RequestResponse } from '../RequestsTypes/RequestResponse';

const getPaged = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<RequestResponse>> =>
    GET.pagedResponse<RequestResponse>(`${API_ROOT}/requests`, params);

export default getPaged;
