import { LeasingLeadListItem } from 'API/Leasing/Types';
import { PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import GET from 'API/utils/GET';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';

const getLeasingLeads = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<LeasingLeadListItem>> =>
    GET.pagedResponse<LeasingLeadListItem>(`${API_ROOT}/leasing/leads`, params);

export default getLeasingLeads;
