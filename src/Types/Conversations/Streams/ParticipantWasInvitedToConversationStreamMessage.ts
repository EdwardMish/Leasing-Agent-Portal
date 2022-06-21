import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface ParticipantWasInvitedToConversationStreamMessage extends ConversationStreamEvent {
    InvitedUserId: number;
}
