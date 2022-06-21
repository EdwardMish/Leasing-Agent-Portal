import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface ParticipantLeftConversationStreamMessage extends ConversationStreamEvent {
    UserId: number;
}
