import { UrlFile } from 'API/Leasing/Types/Asset';
export interface Document {
    id?: number;
    name?: string;
    dateRequested?: Date;
    dateUploaded?: Date;
    documents: (File | UrlFile)[];
}
