import { Document } from 'API/Leasing/Types/Document';
import DELETE from 'API/utils/DELETE';

const deletePersonalLeaseApplicationDocument = async (
    leasingLeadId: number,
    leaseApplicationId: number,
    document: Document,
): Promise<void> =>
    DELETE.wrapper<Document>(
        `${API_ROOT}/leasing/leads/${leasingLeadId}/personal-applications/${leaseApplicationId}/document-groups/${document.id}`,
        document,
    );

export default deletePersonalLeaseApplicationDocument;
