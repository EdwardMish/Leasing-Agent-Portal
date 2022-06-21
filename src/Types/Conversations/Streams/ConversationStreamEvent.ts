import { ConversationStreamEventMetadata } from './ConversationStreamEventMetadata';

export interface ConversationStreamEvent {
    ConversationId: number;
    Metadata: ConversationStreamEventMetadata;
}
