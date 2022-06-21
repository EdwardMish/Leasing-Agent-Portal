import { AxiosRequestConfig } from 'axios';

import addCacheControlHeaders from './addCacheControlHeaders';

describe('addCacheControlHeaders', () => {
    it('should return an object', () => {
        expect(typeof addCacheControlHeaders()).toEqual('object');
    });

    it('should return an object with a headers property', () => {
        expect(!!(addCacheControlHeaders().headers)).toEqual(true);
    });

    it('should maintain config object passed', () => {
        const configObject = {
            url: 'url',
            method: 'get',
            baseURL: 'baseUrl',
            data: 'submitData',
        };

        expect(addCacheControlHeaders(configObject as AxiosRequestConfig)).toEqual({
            ...configObject,
            headers: {
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
            },
        });
    });

    it('should maintain header values within config object', () => {
        const configObject = {
            url: 'url',
            method: 'get',
            headers: {
                'Value-One': 'value-one',
                'Value-Two': 'value-two',
            },
        };

        expect(addCacheControlHeaders(configObject as AxiosRequestConfig)).toEqual({
            ...configObject,
            headers: {
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                'Value-One': 'value-one',
                'Value-Two': 'value-two',
            },
        });
    });
});
