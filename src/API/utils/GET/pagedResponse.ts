import axios, { AxiosResponse } from 'axios';

import addCacheControlHeaders from '../addCacheControlHeaders';
import { PagedResponse } from '../../../Types/api-types/Shared/PagedResponse';
import { PagedSortedFilteredRequestParams } from '../../Shared/PagedSortedFilteredRequest';

export default function pagedResponse<T>(
    url: string,
    params: PagedSortedFilteredRequestParams,
): Promise<PagedResponse<T>> {
    return new Promise((res, rej) => {
        axios.get(url, addCacheControlHeaders({ params }))
            .then(({ data }: AxiosResponse<PagedResponse<T>>) => { res(data); })
            .catch((error: Error) => { rej(error); });
    });
}
