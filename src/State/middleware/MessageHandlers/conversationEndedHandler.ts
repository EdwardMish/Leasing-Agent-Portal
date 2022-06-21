import { conversationsActions } from '../..'
import { Conversation, Streams } from '../../../Types'
import { ConversationEventTypes, ConversationEnded } from '../../../Types/Conversations/Events';
import { ConversationEndedWrappedEvent } from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../Conversations/actions';

export const conversationEndedHandler = ({
    ConversationId,
    Metadata
}: Streams.ConversationEndedStreamMessage,
    conversations: Record<number, Conversation>,
    dispatch
) => {
    const {
        EventDate
    } = Metadata

    if (conversations.hasOwnProperty(ConversationId)) {
        dispatch({
            type: conversationsActions.SET_CONVERSATION_INACTIVE,
            payload: ConversationId
        } as ConversationsActionTypes)

        dispatch({
            type: conversationsActions.ADD_EVENT_TO_CONVERSATION,
            payload: {
                conversationId: ConversationId,
                event: {
                    type: ConversationEventTypes.ConversationEnded,
                    event: {
                        conversationId: ConversationId,
                        metadata: {
                            eventDate: EventDate
                        }
                    } as ConversationEnded
                } as ConversationEndedWrappedEvent
            }
        } as ConversationsActionTypes)
    }
}