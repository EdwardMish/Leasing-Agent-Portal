import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import { Document, Question, Asset, Liability } from 'API/Leasing/Types';

export interface Task {
    type: TaskType;
    name: string;
    isComplete: boolean;
    link?: string;
    details?: Asset | Liability | Question | Document;
}
