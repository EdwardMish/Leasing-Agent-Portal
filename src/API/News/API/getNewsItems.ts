import GET from 'API/utils/GET';
import { PagedResponse } from '../../../Types/api-types/Shared/PagedResponse';
import { PagedSortedFilteredRequestParams } from '../../Shared/PagedSortedFilteredRequest';
import { News } from '../Types';

const getNewsItems = (params: PagedSortedFilteredRequestParams): Promise<PagedResponse<News>> =>
    GET.pagedResponse<News>(`${API_ROOT}/news`, params);

export default getNewsItems;
