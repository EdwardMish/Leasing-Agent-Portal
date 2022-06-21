export enum ComplianceStatus {
    NotSubmitted = 'notSubmitted',
    Pending = 'pending',
    Approved = 'approved',
    Declined = 'declined',
    Expired = 'expired',
    PendingNotRequired = 'pendingNotRequired',
}

export const ComplianceStatusDisplayNames = {
    [ComplianceStatus.NotSubmitted]: 'Not Submitted',
    [ComplianceStatus.Pending]: 'Pending',
    [ComplianceStatus.Approved]: 'Acknowledged',
    [ComplianceStatus.Declined]: 'Declined',
    [ComplianceStatus.Expired]: 'Expired',
    [ComplianceStatus.PendingNotRequired]: 'Pending Not Required',
};
