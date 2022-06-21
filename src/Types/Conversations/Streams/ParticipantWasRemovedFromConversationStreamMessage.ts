import { ConversationStreamEvent } from './ConversationStreamEvent';

export interface ParticipantWasRemovedFromConversationStreamMessage extends ConversationStreamEvent {
    RemovedUserId: number;
}
