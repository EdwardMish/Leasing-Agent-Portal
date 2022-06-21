export interface IssueCountByRegion {
    region: string,
    count: number
}

export interface GetIssueCountsByRegionResponse {
    counts: IssueCountByRegion[];
}
