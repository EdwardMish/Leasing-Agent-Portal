import { Document } from 'API/Leasing/Types/Document';
import PATCH from 'API/utils/PATCH';

const updatePersonalApplicationRequiredDocument = async (
    leaseApplicationId: number,
    requiredDocumentId: number,
    values: Document,
): Promise<number> =>
    PATCH.patchFormData<Document, number>(
        `${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/document-groups/${requiredDocumentId}`,
        values,
    );

export default updatePersonalApplicationRequiredDocument;
