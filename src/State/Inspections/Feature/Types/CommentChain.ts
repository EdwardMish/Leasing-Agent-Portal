import { InspectionComment } from '../../Types/InspectionComment';

export interface CommentChain {
    parent: InspectionComment;
    replies: InspectionComment[];
}