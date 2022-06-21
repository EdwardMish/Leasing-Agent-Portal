import axios, { AxiosError, AxiosResponse } from 'axios';

export default function patchFormData<TRequest, TReturn>(
    url: string,
    data: { [key: string]: string | File } | TRequest
): Promise<TReturn> {
    const formData = new FormData();

    Object.keys(data).forEach((key: string) => {

        if (Array.isArray(data[key])) {
            data[key].forEach((val) => formData.append(key, val));
        } else {
            formData.append(key, data[key]);
        }
    });

    return new Promise((res, rej) => {
        axios
            .patch(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(({ data: response }: AxiosResponse<TReturn>) => {
                response ? res(response) : res({} as TReturn);
            })
            .catch((err: AxiosError) => {
                rej(err);
            });
    });
}
