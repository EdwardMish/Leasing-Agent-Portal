import { IdentificationDocumentType } from './IdentificationDocumentType';

interface document {
    name: string;
    url: string;
}
export interface IdentificationDocument {
    type: IdentificationDocumentType;
    expiration: string;
    number: string;
    state?: string;
    documents: document[];
}
