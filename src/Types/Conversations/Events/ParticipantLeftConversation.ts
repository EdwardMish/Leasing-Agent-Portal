import { ConversationEvent } from './ConversationEvent';

export interface ParticipantLeftConversation extends ConversationEvent {
    userId: number;
}
