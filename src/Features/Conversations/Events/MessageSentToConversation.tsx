import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { conversationsActions, conversationsSelectors, CurrentUserState } from '../../../State';
import { ConversationParticipant } from '../../../Types';
import { MessageSentToConversation as MessageSentToConversationEvent } from '../../../Types/Conversations/Events';
import { MessageSentToConversationWrappedEvent } from '../../../Types/Conversations/WrappedEvents';
import { ConversationsActionTypes } from '../../../State/Conversations/actions';
import markLastMessageRead from 'API/Conversations/markLastMessageRead';

const styles = require('./message-sent-to-conversation.module.css');

interface MessageSentToConversationProps {
    event: MessageSentToConversationEvent;
    conversationId: number;
}

export const MessageSentToConversation: React.FC<MessageSentToConversationProps> = ({ conversationId, event }) => {
    const dispatch = useDispatch();

    const { messageId, userId, message, metadata } = event;

    const { eventDate: date } = metadata;

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);
    const currentParticipant: ConversationParticipant = useSelector(
        conversationsSelectors.conversationParticipant(conversationId, currentUser.id),
    );
    const messageAuthor: ConversationParticipant = useSelector(
        conversationsSelectors.conversationParticipant(conversationId, userId),
    );
    const lastMessageReadForParticipant: number = useSelector(
        conversationsSelectors.lastMessageReadForParticipant(conversationId, currentUser.id),
    );
    const messageEvents: MessageSentToConversationWrappedEvent[] = useSelector(
        conversationsSelectors.conversationMessageEvents(conversationId),
    );

    const [enableListener, toggleListener] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!!currentParticipant && messageId <= lastMessageReadForParticipant) {
            toggleListener(false);
        }
    }, [currentParticipant, lastMessageReadForParticipant]);

    const handleVisibility = async (isVisible: boolean) => {
        if (!isVisible || !!!currentParticipant || !!!messageEvents.length) return;

        const latestMessageId: number = messageEvents
            .map((wrappedEvent: MessageSentToConversationWrappedEvent) => wrappedEvent.event.messageId)
            .sort((a: number, b: number) => b - a)[0];

        if (messageId > lastMessageReadForParticipant && messageId === latestMessageId) {
            await markLastMessageRead(conversationId, messageId);

            dispatch({
                type: conversationsActions.UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT,
                payload: {
                    conversationId,
                    participantId: currentUser.id,
                    messageId: lastMessageReadForParticipant,
                },
            } as ConversationsActionTypes);

            toggleListener(false);
        }
    };

    return (
        <VisibilitySensor onChange={handleVisibility} active={enableListener}>
            <div className={`${styles.UserItem} ${userId == currentUser.id ? styles.CurrentUser : styles.NotCurrentUser}`}>
                <div className={styles.MessageData}>
                    {messageAuthor && <p className={styles.MessageAuthor}>{messageAuthor.userName}</p>}
                    <p>{format(new Date(date), 'h:mm aaaa')}</p>
                </div>
                {messageAuthor && (
                    <p className={`${styles.MessageAuthorTitle}`}>
                        {messageAuthor.userType === 'tenant'
                            ? `${messageAuthor.occupant} @ ${messageAuthor.property}`
                            : 'Owner Operator'}
                    </p>
                )}
                <div className={styles.MessageContent}>
                    <p>{message}</p>
                </div>
            </div>
        </VisibilitySensor>
    );
};
