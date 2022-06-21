import getConversation from 'API/Conversations/getConversation';
import { conversationsActions } from '../..';
import { Conversation, ConversationMessage, StateRecord, Streams, WrappedConversationEvent } from '../../../Types';
import { ConversationEventTypes, MessageSentToConversation } from '../../../Types/Conversations/Events';
import { ConversationsActionTypes } from '../../Conversations/actions';

export const conversationMessageReadHandler = ({
    ConversationId,
    Metadata,
    MessageId,
}: Streams.ConversationMessageReadStreamMessage,
    conversations: StateRecord<Conversation>,
    conversationEvents: StateRecord<WrappedConversationEvent[]>,
    currentUserId: number,
    dispatch
) => {
    const {
        EventDate,
        UserId
    } = Metadata

    // Message was read
    // TODO: Need to update 'last' message read for conversation

    if (currentUserId === UserId) {
        if (conversations.hasOwnProperty(ConversationId)) {
            const { lastMessage }: Conversation = conversations[ConversationId]

            if (MessageId > lastMessage.id) {
                let message: string;

                if (conversationEvents.hasOwnProperty(ConversationId)) {
                    const mostRecentMessageEvent: MessageSentToConversation[] = conversationEvents[ConversationId]
                        .filter((wrappedEvent: WrappedConversationEvent) => wrappedEvent.event.conversationId === ConversationId)
                        .filter((wrappedEvent: WrappedConversationEvent) => wrappedEvent.type === ConversationEventTypes.MessageSentToConversation)
                        .map((wrappedEvent: WrappedConversationEvent) => wrappedEvent.event)
                        .sort((a: MessageSentToConversation, b: MessageSentToConversation) => b.messageId - a.messageId) as MessageSentToConversation[] || []

                    message = mostRecentMessageEvent[0].message
                } else {
                    message = ''
                }

                const conversationMessage: ConversationMessage = {
                    id: MessageId,
                    content: message,
                    created: EventDate,
                    userId: UserId
                }

                dispatch({
                    type: conversationsActions.UPDATE_LAST_MESSAGE,
                    payload: {
                        conversationId: ConversationId,
                        message: conversationMessage
                    }
                } as ConversationsActionTypes)
            }
        } else {
            getConversation(ConversationId)
                .then((conversation: Conversation) => {
                    dispatch({
                        type: conversationsActions.ADD_CONVERSATION,
                        payload: conversation
                    } as ConversationsActionTypes)
                })
        }
    }
}