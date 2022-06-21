import { Attachment } from './Attachment';
import NewsTypes from './NewsTypes';

export interface News {
    id: number;
    type: NewsTypes;
    subject: string;
    body: string;
    date: Date;
    createdBy: number;
    createdByFullName: string;
    isRead: boolean;
    occupants: string[];
    publishFrom: Date;
    publishTo: Date;
    age: number;
    published: boolean;
    attachments: Attachment[];
    canDelete: boolean;
    canEdit: boolean;
}
