import { Address } from './Address';
import { IdentificationDocument } from './IdentificationDocument';

export interface PersonalLeaseApplication {
    id: number;
    propertyName: string;
    propertyId: number;
    created: string;
    started?: string;
    completed?: string;
    name: string;
    dateOfBirth: string;
    phone: string;
    address: Address;
    identificationDocument: IdentificationDocument;
    creditScore: number;
    totalAssets: number;
    totalLiabilities: number;
    completedAssets?: boolean;
    completedDocuments?: boolean;
    completedLiabilities?: boolean;
    completedQuestions?: boolean;
}
