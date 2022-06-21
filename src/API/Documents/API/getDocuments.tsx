import GET from 'API/utils/GET';
import { DocumentLink } from '../Types/DocumentLink';

const getDocuments = (occupantId: number | string): Promise<DocumentLink[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/documents`);

export default getDocuments;
