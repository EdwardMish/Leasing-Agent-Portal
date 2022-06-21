import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import addCacheControlHeaders from '../addCacheControlHeaders';

export default function wrapper<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((res, rej) => {
        axios
            .get(url, addCacheControlHeaders(config))
            .then(({ data }: AxiosResponse<T>) => {
                res(data);
            })
            .catch((error: AxiosError) => {
                rej(error);
            });
    });
}
