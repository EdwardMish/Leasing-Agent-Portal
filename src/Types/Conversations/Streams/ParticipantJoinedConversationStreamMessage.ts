import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface ParticipantJoinedConversationStreamMessage extends ConversationStreamEvent {
    UserId: number;
}
