export enum ComplianceType {
    CertificateOfInsurance = 'certificateOfInsurance',
    Signage = 'signage',
    Plans = 'plans',
    Permits = 'permits',
}

export const ComplianceTypeDisplayNames = {
    [ComplianceType.CertificateOfInsurance]: 'Certificate of Insurance',
    [ComplianceType.Signage]: 'Signage',
    [ComplianceType.Plans]: 'Plans',
    [ComplianceType.Permits]: 'Permits',
};
