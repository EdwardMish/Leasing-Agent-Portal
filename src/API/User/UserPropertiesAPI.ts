import axios, { AxiosResponse } from 'axios';

import addCacheControlHeaders from '../utils/addCacheControlHeaders';

export namespace UserPropertiesAPI {
    export interface Property {
        id: number;
        name: string;
    }

    interface Response {
        properties: Property[];
    }

    export const get = (userId: number | string): Promise<Property[]> => new Promise((res, rej) => {
        axios.get(`${API_ROOT}/users/${userId}/properties`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<Response>) => { res(data.properties); })
            .catch((error: Error) => { rej(error); });
    });
}
