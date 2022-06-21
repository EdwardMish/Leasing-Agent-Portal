import pagedResponse from './pagedResponse';

import { PagedResponse } from '../../../Types/api-types/Shared/PagedResponse';
import { PagedSortedFilteredRequestParams } from '../../Shared/PagedSortedFilteredRequest';

export default async function pagedResponseResults<T>(
    url: string,
    params: PagedSortedFilteredRequestParams,
): Promise<T[]> {
    const { results = [] }: PagedResponse<T> = await pagedResponse(url, params);

    return results;
}
