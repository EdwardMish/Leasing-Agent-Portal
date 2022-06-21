import removeUserFromConversation from 'API/Conversations/removeUserFromConversation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conversationsSelectors } from '../../../State';
import { addErrorMessage, addSuccessMessage } from '../../../State/GlobalMessages/actionCreators';
import { ConversationParticipant } from '../../../Types';
import { hasValidRecord } from '../../../utils';

const styles = require('./conversation-users-panel.module.css');

interface RemoveUsersPanelProps {
    conversationId: number;
}

export const RemoveUsersPanel: React.FC<RemoveUsersPanelProps> = ({ conversationId }) => {
    const dispatch = useDispatch();

    const participants: ConversationParticipant[] = useSelector(
        conversationsSelectors.participantsForConversation(conversationId),
    );

    const removeUser = (participant: ConversationParticipant) => {
        const { userId, userName } = participant;

        removeUserFromConversation(conversationId, userId)
            .then(() => {
                dispatch(addSuccessMessage(`${userName} was removed from the conversation.`));
            })
            .catch(() => {
                dispatch(addErrorMessage(`${userName} was not removed from the conversation.`));
            });
    };

    return (
        <div className={styles.ConversationUsersPanel}>
            <h2>Remove Users</h2>
            <ul className={styles.UsersList}>
                {participants
                    .filter((participant: ConversationParticipant) => participant.isActive)
                    .map((participant: ConversationParticipant) => (
                        <li
                            key={`users-panel-${participant.userId}`}
                            className={styles.User}
                            onClick={() => {
                                removeUser(participant);
                            }}
                        >
                            <p className={styles.UserName}>{participant.userName}</p>
                            {hasValidRecord(participant.email) && <p className={styles.UserEmail}>{participant.email}</p>}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

