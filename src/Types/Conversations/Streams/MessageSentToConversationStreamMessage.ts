import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface MessageSentToConversationStreamMessage extends ConversationStreamEvent {
    Message: string;
    MessageId: number;
    UserId: number;
}
