import { Conversation } from '../../Conversations';

export interface GetAllConversationsResponse {
    results: Conversation[];
    totalCount: number;
}
