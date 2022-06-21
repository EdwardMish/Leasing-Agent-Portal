import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { AssigneeResponse } from '../RequestsTypes/AssigneeResponse';

const getAvailableAssignees = (
    requestId: number | string,
    params: PagedSortedFilteredRequestParams,
): Promise<PagedResponse<AssigneeResponse>> =>
    GET.pagedResponse<AssigneeResponse>(`${API_ROOT}/requests/${requestId}/assignees`, params);

export default getAvailableAssignees;
