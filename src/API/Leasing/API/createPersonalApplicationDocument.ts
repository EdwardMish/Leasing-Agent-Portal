import { Document } from 'API/Leasing/Types/Document';
import POST from 'API/utils/POST';

const createPersonalApplicationDocument = async (leaseApplicationId: number, values: Document): Promise<number> =>
    POST.postFormData<Document, number>(
        `${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/document-groups`,
        values,
    );

export default createPersonalApplicationDocument;
