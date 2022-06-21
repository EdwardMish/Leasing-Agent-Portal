import { conversationsActions } from '../..';
import { ConversationsActionTypes } from '../../Conversations/actions';
import { Conversation, StateRecord, Streams } from '../../../Types';
import { ConversationEventTypes, MessageSentToConversation } from '../../../Types/Conversations/Events';
import { MessageSentToConversationWrappedEvent, WrappedConversationEvent } from '../../../Types/Conversations/WrappedEvents';
import getConversation from 'API/Conversations/getConversation';

export const messageSentToConversationHandler = (
    { ConversationId, Metadata, Message, MessageId, UserId }: Streams.MessageSentToConversationStreamMessage,
    conversations: StateRecord<Conversation>,
    conversationEvents: StateRecord<WrappedConversationEvent[]>,
    currentUserId: number,
    dispatch,
) => {
    if (conversations.hasOwnProperty(ConversationId)) {
        if (Metadata.UserId !== currentUserId) {
            dispatch({
                type: conversationsActions.INCREMENT_UNREAD_MESSAGES,
                payload: ConversationId,
            } as ConversationsActionTypes);
        }

        if (conversationEvents.hasOwnProperty(ConversationId))
            dispatch({
                type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
                payload: {
                    conversationId: ConversationId,
                    event: {
                        type: ConversationEventTypes.MessageSentToConversation,
                        event: {
                            metadata: {
                                eventDate: Metadata.EventDate,
                                userId: UserId,
                            },
                            messageId: MessageId,
                            userId: UserId,
                            message: Message,
                        } as MessageSentToConversation,
                    } as MessageSentToConversationWrappedEvent,
                },
            } as ConversationsActionTypes);
    } else {
        getConversation(ConversationId).then((conversation: Conversation) => {
            dispatch({
                type: conversationsActions.ADD_CONVERSATION,
                payload: conversation,
            });
        });
    }
};
