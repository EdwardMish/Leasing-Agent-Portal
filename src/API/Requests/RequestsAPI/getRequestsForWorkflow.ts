import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { ListResponse } from '../RequestsTypes/ListResponse';
import RequestWorkflows from '../RequestsTypes/RequestWorkFlows';

const getRequestsForWorkflow = {
    [RequestWorkflows.Working]: (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
        GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/owner-operators/${RequestWorkflows.Working}`, params),
    [RequestWorkflows.All]: (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
        GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/owner-operators/${RequestWorkflows.All}`, params),
    [RequestWorkflows.History]: (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
        GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/${RequestWorkflows.History}`, params),
    [RequestWorkflows.New]: (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
        GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/owner-operators/${RequestWorkflows.New}`, params),
    [RequestWorkflows.Watching]: (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<ListResponse>> =>
        GET.pagedResponse<ListResponse>(`${API_ROOT}/requests/${RequestWorkflows.Watching}`, params),
};

export default getRequestsForWorkflow;
