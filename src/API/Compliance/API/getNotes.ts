import GET from 'API/utils/GET';
import { ComplianceNote } from '../Types';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType): Promise<ComplianceNote[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/notes`);
