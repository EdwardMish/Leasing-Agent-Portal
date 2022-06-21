import { Document } from 'API/Leasing/Types/Document';
import DELETE from 'API/utils/DELETE';

const deleteDocument = async (leaseApplicationId: number, document: Document): Promise<void> =>
    DELETE.wrapper<Document>(
        `${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/document-groups/${document.id}`,
        document,
    );

export default deleteDocument;
