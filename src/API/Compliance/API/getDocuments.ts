import GET from 'API/utils/GET';
import { ComplianceDocument } from '../Types/ComplianceDocument';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType): Promise<ComplianceDocument[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/attachments`);
