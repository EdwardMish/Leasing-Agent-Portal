import { NoteAttachment } from './NoteAttachment';

export interface NotesResponse {
    id: number;
    note: string;
    public: boolean;
    createdDate: string;
    createdBy: string;
    createdByUserId: number;
    attachments: NoteAttachment[];
}
