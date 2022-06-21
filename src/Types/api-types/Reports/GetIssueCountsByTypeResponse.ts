export interface IssueTypesByCount {
    period: string,
    suite: number,
    billing: number,
    leaseAssign: number,
    leaseRenew: number,
    property: number,
    newTenant: number,
    suiteRoofing: number,
    securityDeposit: number,
    tia: number,
    submitCOI: number,
    reportAccident: number,
    contactInfoChange: number
}

export interface GetIssueCountsByTypeResponse {
    typeCounts: IssueTypesByCount[];
}
