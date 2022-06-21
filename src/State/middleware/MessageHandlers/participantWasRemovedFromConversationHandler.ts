import { Streams } from '../../../Types'
import { conversationsActions } from '../..';
import { ConversationEventTypes, ParticipantWasRemovedFromConversation } from '../../../Types/Conversations/Events';
import { ParticipantWasRemovedFromConversationWrappedEvent } from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../Conversations/actions';

export const participantWasRemovedFromConversationHandler = ({
    ConversationId,
    Metadata,
    RemovedUserId,
}: Streams.ParticipantWasRemovedFromConversationStreamMessage,
    currentUserId: number,
    dispatch
) => {
    const {
        EventDate: RemovedDate,
        UserId: RemoverUserId
    } = Metadata

    if (currentUserId === RemovedUserId) {
        dispatch({
            type: conversationsActions.SET_CONVERSATION_INACTIVE,
            payload: ConversationId
        } as ConversationsActionTypes)
    }

    dispatch({
        type: conversationsActions.SET_PARTICIPANT_INACTIVE,
        payload: {
            conversationId: ConversationId,
            participantId: RemovedUserId
        }
    } as ConversationsActionTypes)

    dispatch({
        type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
        payload: {
            conversationId: ConversationId,
            event: {
                type: ConversationEventTypes.ParticipantWasRemovedFromConversation,
                event: {
                    conversationId: ConversationId,
                    metadata: {
                        eventDate: RemovedDate,
                        userId: RemoverUserId
                    },
                    removedUserId: RemovedUserId
                } as ParticipantWasRemovedFromConversation
            } as ParticipantWasRemovedFromConversationWrappedEvent
        }
    } as ConversationsActionTypes)
}