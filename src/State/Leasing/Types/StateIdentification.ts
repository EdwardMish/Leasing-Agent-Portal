export interface StateIdentificationType {
    identificationNumber: string;
    stateOfIssue: string;
    stateIdExpirationDate: string;
    uploadIdFront: Record<string, any>;
    uploadIdBack: Record<string, any>;
}
