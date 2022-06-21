import { Streams } from '../../../Types'
import { conversationsActions } from '../..';
import { ParticipantLeftConversation, ConversationEventTypes } from '../../../Types/Conversations/Events';
import { ParticipantLeftConversationWrappedEvent } from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../Conversations/actions';

export const participantLeftConversationHandler = ({
    ConversationId,
    Metadata,
    UserId
}: Streams.ParticipantLeftConversationStreamMessage,
    currentUserId: number,
    dispatch
) => {
    const {
        EventDate: LeftDate
    } = Metadata
    if (currentUserId === UserId) {
        dispatch({
            type: conversationsActions.SET_CONVERSATION_INACTIVE,
            payload: ConversationId
        } as ConversationsActionTypes)
    }

    dispatch({
        type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
        payload: {
            conversationId: ConversationId,
            event: {
                type: ConversationEventTypes.ParticipantLeftConversation,
                event: {
                    conversationId: ConversationId,
                    metadata: {
                        eventDate: LeftDate,
                        userId: UserId
                    },
                    userId: UserId
                } as ParticipantLeftConversation
            } as ParticipantLeftConversationWrappedEvent
        }
    } as ConversationsActionTypes)
}