import getConversation from 'API/Conversations/getConversation';
import getConversationEvents from 'API/Conversations/getConversationEvents';
import getConversationParticipants from 'API/Conversations/getConversationParticipants';
import sendMessage from 'API/Conversations/sendMessage';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightCircle, Close, Gear } from '../../../Icons';
import { useControlledForm } from '../../../Shared/FormFields';
import { LoadingContent } from '../../../Shared/PageElements';
import { conversationsActions, conversationsSelectors, CurrentUserState } from '../../../State';
import { ConversationsActionTypes } from '../../../State/Conversations/actions';
import { addErrorMessage } from '../../../State/GlobalMessages/actionCreators';
import { Conversation, ConversationParticipant, ConversationStreamEvent } from '../../../Types';
import { ConversationAdminPanel } from '../ConversationAdminPanel';
import { ConversationEventList } from '../ConversationEventList';

const styles = require('./conversation-detail.module.css');

interface ConversationProps {
    conversationId: number;
}

export const ConversationDetail: React.FC<ConversationProps> = ({ conversationId }) => {
    const dispatch = useDispatch();

    const currentUserId: number = useSelector(CurrentUserState.selectors.currentUserId);
    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const eventsLoadedForConversation: boolean = useSelector(
        conversationsSelectors.eventsLoadedForConversation(conversationId),
    );

    const conversationParticipants: ConversationParticipant[] = useSelector(
        conversationsSelectors.participantsForConversation(conversationId),
    );
    const currentParticipant: ConversationParticipant = useSelector(
        conversationsSelectors.conversationParticipant(conversationId, currentUserId),
    );
    const participantsLoadedForConversations: boolean = useSelector(
        conversationsSelectors.participantsLoadedForConversation(conversationId),
    );

    const conversationIsLoaded: boolean = useSelector(conversationsSelectors.conversationIsLoaded(conversationId));
    const conversationIsActive: boolean = useSelector(conversationsSelectors.conversationIsActive(conversationId));
    const conversationTopic: string = useSelector(conversationsSelectors.conversationTopic(conversationId));
    const lastMessageReadForParticipant: number = useSelector(
        conversationsSelectors.lastMessageReadForParticipant(conversationId, currentUserId),
    );

    const [disableSend, setDisableSend] = React.useState<boolean>(false);
    const [showAdminPanel, toggleAdminPanel] = React.useState<boolean>(false);
    const [userIsActive, setUserIsActive] = React.useState<boolean>();

    const [inputValue, handler, forceUpdate] = useControlledForm();

    React.useEffect(() => {
        if (!!currentParticipant && lastMessageReadForParticipant > currentParticipant.lastMessageIdRead) {
            dispatch({
                type: conversationsActions.CLEAR_UNREAD_MESSAGES,
                payload: conversationId,
            } as ConversationsActionTypes);
        }
    }, [lastMessageReadForParticipant, currentParticipant]);

    React.useEffect(() => {
        if (participantsLoadedForConversations && !!currentUserId) {
            const current: ConversationParticipant =
                conversationParticipants.find((c: ConversationParticipant) => c.userId === currentUserId) ||
                ({} as ConversationParticipant);

            const { isActive = false } = current;

            if (userIsActive !== isActive) setUserIsActive(isActive);
        }
    }, [currentUserId, conversationParticipants.length, participantsLoadedForConversations]);

    React.useEffect(() => {
        if (conversationIsLoaded) {
            dispatch({
                type: conversationsActions.CLEAR_UNREAD_MESSAGES,
                payload: conversationId,
            } as ConversationsActionTypes);
        } else {
            getConversation(conversationId).then((c: Conversation) => {
                dispatch({
                    type: conversationsActions.ADD_CONVERSATION,
                    payload: c,
                } as ConversationsActionTypes);
            });
        }
    }, [conversationIsLoaded]);

    React.useEffect(() => {
        if (!eventsLoadedForConversation) {
            getConversationEvents(conversationId).then((events: ConversationStreamEvent[]) => {
                dispatch({
                    type: conversationsActions.SET_CONVERSATION_EVENTS,
                    payload: {
                        conversationId,
                        events,
                    },
                } as ConversationsActionTypes);
            });
        }
    }, [eventsLoadedForConversation]);

    React.useEffect(() => {
        if (!participantsLoadedForConversations) {
            getConversationParticipants(conversationId).then((participants: ConversationParticipant[]) => {
                dispatch({
                    type: conversationsActions.SET_CONVERSTION_PARTICIPANTS,
                    payload: {
                        conversationId,
                        participants,
                    },
                } as ConversationsActionTypes);
            });
        }
    }, [participantsLoadedForConversations]);

    const send = () => {
        if (disableSend || !!!inputValue.length) return;

        setDisableSend(true);

        sendMessage(conversationId, inputValue)
            .then(() => {
                forceUpdate('');
                setDisableSend(false);
            })
            .catch((err) => {
                dispatch(addErrorMessage('Your message was not sent.'));
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') send();
    };

    return (
        <div className={styles.Conversation}>
            <div className={styles.ConversationContent}>
                {conversationIsLoaded && eventsLoadedForConversation && typeof userIsActive === 'boolean' ? (
                    <>
                        <div className={styles.ConversationTitleBar}>
                            <p>{conversationTopic || ''}</p>
                            {conversationIsActive && userIsActive && (
                                <div
                                    onClick={() => {
                                        toggleAdminPanel(!showAdminPanel);
                                    }}
                                >
                                    {showAdminPanel ? <Close aspect="1.5rem" /> : <Gear />}
                                </div>
                            )}
                        </div>
                        {showAdminPanel ? (
                            <ConversationAdminPanel
                                conversationId={conversationId}
                                closePanel={() => {
                                    toggleAdminPanel(false);
                                }}
                            />
                        ) : (
                            <>
                                {currentUserIsTenant && (
                                    <p key="event-list-tenant-disclaimer" className={styles.DisclaimerBlock}>
                                        Please be patient, responses may not be immediate.
                                    </p>
                                )}
                                <ConversationEventList conversationId={conversationId} hasDisclaimer={currentUserIsTenant} />
                                {conversationIsActive && userIsActive && (
                                    <div className={styles.MessageInput}>
                                        <input
                                            className={styles.Input}
                                            id="conversation-input"
                                            name="Conversation Input"
                                            type="text"
                                            value={inputValue}
                                            onChange={handler}
                                            disabled={!conversationIsActive}
                                            onKeyPress={handleKeyPress}
                                            autoComplete="off"
                                        />
                                        <div
                                            className={styles.SendMessage}
                                            onKeyPress={handleKeyPress}
                                            onClick={() => {
                                                conversationIsActive && send();
                                            }}
                                        >
                                            <ArrowRightCircle />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <div className={styles.LoadingWrapper}>
                        <LoadingContent />
                    </div>
                )}
            </div>
        </div>
    );
};

