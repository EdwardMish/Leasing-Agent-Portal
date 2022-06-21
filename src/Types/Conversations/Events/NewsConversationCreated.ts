import { ConversationEvent } from './ConversationEvent';

export interface NewsConversationCreated extends ConversationEvent {
    newsId: number;
}
