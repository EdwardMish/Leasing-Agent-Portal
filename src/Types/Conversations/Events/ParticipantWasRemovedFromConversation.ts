import { ConversationEvent } from './ConversationEvent';

export interface ParticipantWasRemovedFromConversation extends ConversationEvent {
    removedUserId: number;
}
