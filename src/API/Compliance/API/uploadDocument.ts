import POST from 'API/utils/POST';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType, documents: File[]): Promise<void> =>
    POST.postAttachments(
        `${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/attachments`,
        'attachments',
        documents,
    );
