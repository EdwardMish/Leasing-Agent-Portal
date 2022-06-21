import { Conversation, ConversationParticipant, Streams } from '../../../Types';
import { conversationsActions, ToastMessages } from '../..';
import { ConversationEventTypes, ParticipantJoinedConversation } from '../../../Types/Conversations/Events';
import {
    ParticipantJoinedConversationWrappedEvent,
    WrappedConversationEvent,
} from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../Conversations/actions';
import getConversation from 'API/Conversations/getConversation';
import getConversationParticipant from 'API/Conversations/getConversationParticipant';

export const participantJoinedConversationHandler = (
    { ConversationId, Metadata, UserId }: Streams.ParticipantJoinedConversationStreamMessage,
    conversations: Record<number, Conversation>,
    events: Record<number, WrappedConversationEvent[]>,
    participants: Record<number, ConversationParticipant[]>,
    currentUserId: number,
    dispatch,
) => {
    const { EventDate: JoinedDate } = Metadata;

    if (currentUserId === UserId && !conversations.hasOwnProperty(ConversationId)) {
        getConversation(ConversationId).then((conversation: Conversation) => {
            dispatch({
                type: conversationsActions.ADD_CONVERSATION,
                payload: conversation,
            } as ConversationsActionTypes);

            dispatch({
                type: ToastMessages.Actions.ADD_MESSAGE,
                payload: {
                    id: Date.now(),
                    title: 'New Conversation',
                    message: `You've been added to a new conversation.`,
                    action: {
                        display: 'Click to open Conversations',
                        func: () => {
                            dispatch({
                                type: ToastMessages.Actions.ADD_TRIGGER,
                                payload: {
                                    id: Date.now(),
                                    name: ToastMessages.Types.ToastMessageTriggers.OPEN_CONVERSATIONS,
                                },
                            });
                        },
                    },
                } as ToastMessages.Types.ToastMessage,
            });
        });
    }

    if (
        participants.hasOwnProperty(ConversationId) &&
        !!!participants[ConversationId].find((p: ConversationParticipant) => p.userId === UserId)
    ) {
        getConversationParticipant(ConversationId, UserId).then((participant: ConversationParticipant) => {
            dispatch({
                type: conversationsActions.ADD_PARTICIPANT_TO_CONVERSATION,
                payload: {
                    conversationId: ConversationId,
                    participant,
                },
            } as ConversationsActionTypes);
        });
    }

    if (events.hasOwnProperty(ConversationId)) {
        dispatch({
            type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
            payload: {
                conversationId: ConversationId,
                event: {
                    type: ConversationEventTypes.ParticipantJoinedConversation,
                    event: {
                        conversationId: ConversationId,
                        metadata: {
                            eventDate: JoinedDate,
                            userId: UserId,
                        },
                        userId: UserId,
                    } as ParticipantJoinedConversation,
                } as ParticipantJoinedConversationWrappedEvent,
            },
        } as ConversationsActionTypes);
    }
};
