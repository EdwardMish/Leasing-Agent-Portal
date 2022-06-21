import { UrlFile } from 'API/Leasing/Types/Asset';

export enum LiabilityType {
    CreditCard = 'creditCard',
    Loan = 'loan',
    Mortgage = 'mortgage',
    Other = 'other',
}

export const liabilityTypesDisplayNames = {
    [LiabilityType.CreditCard]: 'Credit Card',
    [LiabilityType.Loan]: 'Loan',
    [LiabilityType.Mortgage]: 'Mortgage',
    [LiabilityType.Other]: 'Other',
};

export interface Liability {
    id?: number;
    nickName: string;
    amount: number;
    jointOwnersName?: string;
    type: LiabilityType;
    isJoint: boolean;
    attachments: (File | UrlFile)[];
    otherTypeName?: string;
}
