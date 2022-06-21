import PATCH from 'API/utils/PATCH';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/skip`);
