import { RequestHistory } from '.';
import { StateRecord } from '../../../Types';

import { Category } from './Category';
import { Request } from './Request'
import { RequestNote } from './RequestNote'

export interface RequestState {
    categories: StateRecord<Category>;
    requests: StateRecord<Request>;
    requestHistory: Record<number, RequestHistory[]>;
    requestNotes: Record<number, RequestNote[]>;
    pendingAttachments: Record<number, File[]>;
}