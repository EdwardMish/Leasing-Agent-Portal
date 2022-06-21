import axios from 'axios';

import addCacheControlHeaders from '../addCacheControlHeaders';

export default async function wrapper<T>(url: string, data?: T): Promise<void> {
    return new Promise((res, rej) => {
        axios.delete(url, addCacheControlHeaders({ data: { ...data } }))
            .then(() => { res(); })
            .catch((error: Error) => { rej(error); });
    });
}
