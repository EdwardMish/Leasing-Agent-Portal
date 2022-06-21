import { ConversationEvent } from './ConversationEvent';

export interface ConversationMessageRead extends ConversationEvent {
    messageId: number;
}
