import { ConversationMessage } from './ConversationMessage';

export interface Conversation {
    id: number;
    topic: string;
    isActive: boolean;
    unreadMessages: number;
    lastMessage: ConversationMessage;
    type: string;
}
