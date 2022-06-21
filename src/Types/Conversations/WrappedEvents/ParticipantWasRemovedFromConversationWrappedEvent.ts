import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ParticipantWasRemovedFromConversation } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ParticipantWasRemovedFromConversationWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ParticipantWasRemovedFromConversation,
    event: ParticipantWasRemovedFromConversation;
}
