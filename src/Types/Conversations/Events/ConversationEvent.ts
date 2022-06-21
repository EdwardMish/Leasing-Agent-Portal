import { ConversationEventMetadata } from './ConversationEventMetadata';

export interface ConversationEvent {
    conversationId: number;
    metadata: ConversationEventMetadata;
}
