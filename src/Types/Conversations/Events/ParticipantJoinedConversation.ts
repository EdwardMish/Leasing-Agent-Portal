import { ConversationEvent } from './ConversationEvent';

export interface ParticipantJoinedConversation extends ConversationEvent {
    userId: number;
}
