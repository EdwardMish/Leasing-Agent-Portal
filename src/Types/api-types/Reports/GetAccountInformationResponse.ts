export interface AccountInformation {
    totalActiveOccupants: number,
    totalActiveOccupantsWithAccounts: number,
    totalOccupantActiveAccounts: number,
    totalAccountsWithoutOccupant: number
}

export interface GetAccountInformationResponse {
    accountInformation: AccountInformation;
}
