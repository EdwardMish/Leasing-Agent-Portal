import axios, { AxiosError, AxiosResponse } from 'axios';

export default function postWithResponse<T, R>(url: string, body: T): Promise<R> {
    return new Promise((res, rej) => {
        axios.post(
            url,
            body,
            { headers: { 'Content-Type': 'application/json' } },
        )
            .then(({ data }: AxiosResponse<R>) => { res(data); })
            .catch((err: AxiosError) => { rej(err); });
    });
}
