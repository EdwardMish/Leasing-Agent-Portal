import { ComplianceStatus, ComplianceStatusDisplayNames, ComplianceType } from "../API/Compliance/Types";

const signagStatusDisplayNames = {
    ...ComplianceStatusDisplayNames,
    [ComplianceStatus.Approved]: "Approved",
};

const complianceDisplayName = (status: ComplianceStatus, type: ComplianceType): string => {
    if (type === ComplianceType.Signage) return signagStatusDisplayNames[status];

    return ComplianceStatusDisplayNames[status] || status;
};

export default complianceDisplayName;
