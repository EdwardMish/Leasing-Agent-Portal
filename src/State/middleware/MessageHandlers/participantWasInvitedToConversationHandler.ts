import { Conversation, ConversationParticipant, Streams } from '../../../Types'
import { conversationsActions, ToastMessages } from '../..';
import { ConversationEventTypes, ParticipantWasInvitedToConversation } from '../../../Types/Conversations/Events';
import { ParticipantWasInvitedToConversationWrappedEvent, WrappedConversationEvent } from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../Conversations/actions';
import getConversation from 'API/Conversations/getConversation';
import getConversationParticipant from 'API/Conversations/getConversationParticipant';

export const participantWasInvitedToConversationHandler = ({
    ConversationId,
    Metadata,
    InvitedUserId,

}: Streams.ParticipantWasInvitedToConversationStreamMessage,
    conversations: Record<number, Conversation>,
    events: Record<number, WrappedConversationEvent[]>,
    participants: Record<number, ConversationParticipant[]>,
    currentUserId: number,
    dispatch
) => {
    const {
        EventDate: InvitedDate,
        UserId: InvitingUserId
    } = Metadata

    if (currentUserId === InvitedUserId && !conversations.hasOwnProperty(ConversationId)) {
        getConversation(ConversationId)
            .then((conversation: Conversation) => {
                dispatch({
                    type: conversationsActions.ADD_CONVERSATION,
                    payload: conversation
                } as ConversationsActionTypes)

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
                                        name: ToastMessages.Types.ToastMessageTriggers.OPEN_CONVERSATIONS
                                    }
                                })
                            }
                        }
                    } as ToastMessages.Types.ToastMessage
                })
            })
    }

    if (participants.hasOwnProperty(ConversationId) && !(!!participants[ConversationId].find((p: ConversationParticipant) => p.userId === InvitedUserId))) {
        getConversationParticipant(ConversationId, InvitedUserId)
            .then((participant: ConversationParticipant) => {
                dispatch({
                    type: conversationsActions.ADD_PARTICIPANT_TO_CONVERSATION,
                    payload: {
                        conversationId: ConversationId,
                        participant
                    }
                } as ConversationsActionTypes)
            })
    }

    if (events.hasOwnProperty(ConversationId)) {
        dispatch({
            type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
            payload: {
                conversationId: ConversationId,
                event: {
                    type: ConversationEventTypes.ParticipantWasInvitedToConversation,
                    event: {
                        conversationId: ConversationId,
                        metadata: {
                            eventDate: InvitedDate,
                            userId: InvitingUserId
                        },
                        invitedUserId: InvitedUserId,
                    } as ParticipantWasInvitedToConversation
                } as ParticipantWasInvitedToConversationWrappedEvent
            }
        } as ConversationsActionTypes)
    }
}