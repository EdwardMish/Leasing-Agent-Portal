import { ComplianceNote } from './ComplianceNote';
import { ComplianceStatus } from './ComplianceStatus';
import { ComplianceType } from './ComplianceType';

export interface OccupantCompliance {
    complianceType: ComplianceType;
    complianceStatus: ComplianceStatus;
    notes: ComplianceNote[];
}
