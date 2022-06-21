import GET from 'API/utils/GET';
import { PagedSortedFilteredRequestParams } from '../../Shared/PagedSortedFilteredRequest';
import { News } from '../Types';

const emergencyFilterParams: PagedSortedFilteredRequestParams = {
    pageNumber: 1,
    pageSize: 100,
    sort: 'age~Ascending',
    filter: ['type~emergency~eq', 'isRead~false~eq'],
};

const getEmergencyNewsItems = async (): Promise<News[]> =>
    GET.pagedResponseResults<News>(`${API_ROOT}/news`, emergencyFilterParams);

export default getEmergencyNewsItems;
