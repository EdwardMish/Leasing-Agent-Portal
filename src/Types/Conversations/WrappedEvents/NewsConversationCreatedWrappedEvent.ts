import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { NewsConversationCreated } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface NewsConversationCreatedWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.NewsConversationCreated,
    event: NewsConversationCreated;
}
