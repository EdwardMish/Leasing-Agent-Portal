import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ParticipantWasInvitedToConversation } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ParticipantWasInvitedToConversationWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ParticipantWasInvitedToConversation,
    event: ParticipantWasInvitedToConversation;
}
