import GET from 'API/utils/GET';
import { Document } from 'API/Leasing/Types/Document';

const getDocuments = async (leaseApplicationId: number): Promise<Document[]> =>
    GET.wrapper<Document[]>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/document-groups`);
export default getDocuments;
