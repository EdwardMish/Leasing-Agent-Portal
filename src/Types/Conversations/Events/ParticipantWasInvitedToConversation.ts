import { ConversationEvent } from './ConversationEvent';

export interface ParticipantWasInvitedToConversation extends ConversationEvent {
    invitedUserId: number;
}
