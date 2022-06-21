import axios from 'axios';

export default function postAttachments(url: string, key: string, blobs: Blob[]): Promise<void> {
    const formData = new FormData();

    blobs.forEach((blob: Blob) => {
        formData.append(key, blob);
    });

    return new Promise((res, rej) => {
        axios.post(
            url,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        )
            .then(() => { res(); })
            .catch(() => { rej(); });
    });
}
