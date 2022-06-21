import { ConversationEvents, ConversationEventTypes } from '../Events';

export interface ConversationWrappedEvent {
    type: ConversationEventTypes;
    event: ConversationEvents;
}
