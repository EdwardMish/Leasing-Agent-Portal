import DELETE from 'API/utils/DELETE';
import { ComplianceType } from '../Types/ComplianceType';

export default (occupantId: number, complianceType: ComplianceType, fileName: string): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/occupants/${occupantId}/compliance/${complianceType}/attachments/${fileName}/delete`);
