import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../../../Shared/Search';
import { LoadingContent } from '../../../Shared/PageElements';
import { conversationsActions, conversationsSelectors } from '../../../State';
import { ConversationsActionTypes } from '../../../State/Conversations/actions';
import { addErrorMessage, addSuccessMessage } from '../../../State/GlobalMessages/actionCreators';
import { ConversationParticipant, ConversationUserReference } from '../../../Types';
import { hasValidRecord } from '../../../utils';
import addUserToConversation from 'API/Conversations/addUserToConversation';
import getAvailableUsers from 'API/Conversations/getAvailableUsers';

const styles = require('./conversation-users-panel.module.css');

interface ConversationUsersPanelProps {
    conversationId: number;
}

export const ConversationUsersPanel: React.FC<ConversationUsersPanelProps> = ({ conversationId }) => {
    const dispatch = useDispatch();

    const availableUsers: ConversationUserReference[] = useSelector(
        conversationsSelectors.availableUsersForConversation(conversationId),
    );
    const availableUsersLoaded: boolean = useSelector(
        conversationsSelectors.availableUsersLoadedForConversation(conversationId),
    );
    const participants: ConversationParticipant[] = useSelector(
        conversationsSelectors.participantsForConversation(conversationId),
    );

    const [filteredUsers, setFilteredUsers] = React.useState<ConversationUserReference[]>([]);

    React.useEffect(() => {
        if (!availableUsersLoaded) {
            getAvailableUsers(conversationId).then((userReferences: ConversationUserReference[]) => {
                dispatch({
                    type: conversationsActions.SET_AVAILABLE_USERS,
                    payload: {
                        conversationId,
                        availableUsers: userReferences,
                    },
                } as ConversationsActionTypes);
            });
        }

        if (availableUsersLoaded && !!availableUsers.length) {
            const participantIds: number[] = participants.map((p: ConversationParticipant) => p.userId);

            setFilteredUsers(availableUsers.filter((u: ConversationUserReference) => !participantIds.includes(u.userId)));
        }
    }, [availableUsersLoaded, availableUsers.length, participants.length]);

    const searchHandler = (searchTerm: string): void => {
        const term: string = searchTerm.toLowerCase();
        const activeParticipantIds: number[] = participants
            .filter((p: ConversationParticipant) => p.isActive)
            .map((p: ConversationParticipant) => p.userId);

        const filtered: ConversationUserReference[] = availableUsers
            .filter((u: ConversationUserReference) => !activeParticipantIds.includes(u.userId))
            .filter((u: ConversationUserReference) => u.userName.toLowerCase().includes(term));

        setFilteredUsers(filtered);
    };

    const clearSearch = () => {
        const participantIds: number[] = participants.map((p: ConversationParticipant) => p.userId);

        setFilteredUsers(availableUsers.filter((u: ConversationUserReference) => !participantIds.includes(u.userId)));
    };

    const addUser = (user: ConversationUserReference) => {
        const { userId, userName } = user;

        if (
            participants.map((p: ConversationParticipant) => p.userId).includes(userId) &&
            participants.filter((p) => p.userId == userId)[0].isActive
        )
            return;

        addUserToConversation(conversationId, userId)
            .then(() => {
                dispatch(addSuccessMessage(`${userName} was added to the conversation.`));
            })
            .catch(() => {
                dispatch(addErrorMessage(`${userName} was not added to the conversation.`));
            });
    };

    return (
        <div className={styles.ConversationUsersPanel}>
            {availableUsersLoaded ? (
                <>
                    <h2>Add Users</h2>
                    {!!availableUsers ? (
                        <>
                            <Search handler={searchHandler} placeholder="Search Users" clearCallback={clearSearch} />
                            <ul className={styles.UsersList}>
                                {filteredUsers.map((userReference: ConversationUserReference) => (
                                    <li
                                        key={`users-panel-${userReference.userId}`}
                                        className={styles.User}
                                        onClick={() => {
                                            addUser(userReference);
                                        }}
                                    >
                                        <p className={styles.UserName}>{userReference.userName}</p>
                                        {hasValidRecord(userReference.email) && (
                                            <p className={styles.UserEmail}>{userReference.email}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <LoadingContent message="There are no users that can be added to this conversation." />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </div>
    );
};

