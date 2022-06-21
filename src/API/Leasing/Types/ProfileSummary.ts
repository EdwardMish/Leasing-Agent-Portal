import { IdentificationDocumentType } from './IdentificationDocumentType';

export interface ProfileSummary {
    creditScore: number;
    totalAssets: number;
    totalLiabilities: number;
    netWorth?: number;
    phone: string;
    IDType: IdentificationDocumentType;
    addressOne: string;
    state: string;
    DOB: string;
    IDNumber: string;
    addressTwo: string;
    zipcode: string;
    SSN?: string;
    city: string;
    expiration: string;
}
