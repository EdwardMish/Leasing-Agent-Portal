import { Note } from '../../Types/Note';
import { Photo } from '../../Types/Photo';

export interface Interaction {
    id: number;
    createdDate: string;
    occupantId: number;
    notes: Note[];
    photos: Photo[];
}

export const activeInteractionInitialState = {
    id: 0,
    createdDate: '',
    occupantId: 0,
    notes: [],
    photos: [],
};
