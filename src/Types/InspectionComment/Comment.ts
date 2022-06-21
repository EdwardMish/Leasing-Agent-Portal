import { Note } from '../Notes';

export interface InspectionComment extends Note {
    createdDate: string,
    parent?: number
}