export enum AssetType {
    Cash = 'cash',
    Retirement = 'retirement',
    Brokerage = 'brokerage',
    RealEstate = 'realEstate',
    Other = 'other',
}

export const AssetTypesDisplayNames = {
    [AssetType.Cash]: 'Cash',
    [AssetType.Retirement]: 'Retirement',
    [AssetType.Brokerage]: 'Brokerage',
    [AssetType.RealEstate]: 'Real Estate',
    [AssetType.Other]: 'Other',
};

export interface UrlFile {
    id?: number;
    name: string;
    type?: string;
    url: string;
}
export interface Asset {
    id?: number;
    nickName: string;
    amount: number;
    jointOwnersName?: string;
    type: AssetType;
    isJoint: boolean;
    attachments: (File | UrlFile)[];
    otherTypeName?: string;
}
