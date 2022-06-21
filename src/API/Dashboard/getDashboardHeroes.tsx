import axios, { AxiosResponse } from 'axios';

import addCacheControlHeaders from '../utils/addCacheControlHeaders';

const getDashboardHeroes = (): Promise<any> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/dashboard/heros`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<any>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getDashboardHeroes;
