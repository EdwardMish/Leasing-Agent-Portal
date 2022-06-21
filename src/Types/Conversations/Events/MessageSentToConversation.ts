import { ConversationEvent } from './ConversationEvent';

export interface MessageSentToConversation extends ConversationEvent {
    message: string;
    messageId: number;
    userId: number;
}
