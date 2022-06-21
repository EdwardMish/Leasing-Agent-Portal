import { Conversation } from "../../../Types/Conversations/Conversation";
import { ConversationParticipant } from "../../../Types/Conversations/ConversationParticipant";
import { ConversationUserReference } from "../../../Types/Conversations/ConversationUserReference";
import { WrappedConversationEvent } from "../../../Types/Conversations/WrappedEvents";
import { StateRecord } from "../../../Types/State/StateRecord";

export interface ConversationsState {
    availableUsers: StateRecord<ConversationUserReference[]>;
    conversations: StateRecord<Conversation>;
    conversationEvents: StateRecord<WrappedConversationEvent[]>;
    conversationParticipants: StateRecord<ConversationParticipant[]>;
}
