import axios from 'axios';

export default function wrapper<T>(url: string, body?: T): Promise<void> {
    return new Promise((res, rej) => {
        axios.post(
            url,
            body,
            { headers: { 'Content-Type': 'application/json' } },
        )
            .then(() => { res(); })
            .catch(() => { rej(); });
    });
}
