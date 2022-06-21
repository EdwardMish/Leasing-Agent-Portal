import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ParticipantLeftConversation } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ParticipantLeftConversationWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ParticipantLeftConversation,
    event: ParticipantLeftConversation;
}
