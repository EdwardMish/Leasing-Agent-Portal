import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ConversationMessageRead } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ConversationMessageReadWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ConversationMessageRead,
    event: ConversationMessageRead;
}
