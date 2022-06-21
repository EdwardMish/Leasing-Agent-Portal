import { Asset } from './Asset';
import { Document } from './Document';
import { Liability } from './Liability';
import { Question } from './Question';

export interface Task {
    assets?: Asset[];
    liabilities?: Liability[];
    questions?: Question[];
    documents?: Document[];
}
