import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ParticipantJoinedConversation } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ParticipantJoinedConversationWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ParticipantJoinedConversation,
    event: ParticipantJoinedConversation;
}
