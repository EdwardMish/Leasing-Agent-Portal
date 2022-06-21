import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface ConversationMessageReadStreamMessage extends ConversationStreamEvent {
    MessageId: number;
}
