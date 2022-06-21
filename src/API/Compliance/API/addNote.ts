import POST from 'API/utils/POST';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType, note: string): Promise<void> =>
    POST.wrapper<{ note: string }>(`${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/notes`, { note });
