import { GET } from 'API/utils';

const getAttachment = (url: string): Promise<Blob> => GET.wrapper<Blob>(url, { responseType: 'blob' });

export default getAttachment;
