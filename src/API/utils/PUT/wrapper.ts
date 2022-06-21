import axios, { AxiosError } from 'axios';

export default function wrapper<T>(url: string, body?: T): Promise<void> {
    return new Promise((res, rej) => {
        axios.put(
            url,
            body,
            { headers: { 'Content-Type': 'application/json' } },
        )
            .then(() => { res(); })
            .catch((error: AxiosError) => { rej(error); });
    });
}
