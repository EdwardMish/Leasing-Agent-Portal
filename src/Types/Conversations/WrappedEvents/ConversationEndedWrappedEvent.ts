import { ConversationEventTypes } from '../Events/ConversationEventTypes';
import { ConversationEnded } from '../Events';
import { ConversationWrappedEvent } from './ConversationWrappedEvent';

export interface ConversationEndedWrappedEvent extends ConversationWrappedEvent {
    type: ConversationEventTypes.ConversationEnded,
    event: ConversationEnded;
}
