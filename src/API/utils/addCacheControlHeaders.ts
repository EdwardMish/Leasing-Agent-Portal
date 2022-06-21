import { AxiosRequestConfig } from 'axios';

const configHeaders: Record<string, string> = {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
};

const addCacheControlHeaders = (config: AxiosRequestConfig = {}): AxiosRequestConfig => ({
    ...config,
    headers: config.headers
        ? { ...config.headers, ...configHeaders }
        : configHeaders,
});

export default addCacheControlHeaders;
