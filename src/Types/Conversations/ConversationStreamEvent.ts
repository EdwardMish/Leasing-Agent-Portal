import { ConversationEvents } from './Events';

export interface ConversationStreamEvent {
    type: string;
    event: ConversationEvents;
}
