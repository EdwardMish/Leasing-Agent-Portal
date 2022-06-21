import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { MessageSentToConversation } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface MessageSentToConversationWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.MessageSentToConversation,
    event: MessageSentToConversation;
}
