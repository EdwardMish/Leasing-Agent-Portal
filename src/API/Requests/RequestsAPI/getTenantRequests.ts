import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { ListResponse } from '../RequestsTypes/ListResponse';
import RequestWorkflows from '../RequestsTypes/RequestWorkFlows';

const getTenantRequests = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
    GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/tenants/${RequestWorkflows.All}`, params);

export default getTenantRequests;
