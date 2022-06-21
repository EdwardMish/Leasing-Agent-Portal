import endConversation from 'API/Conversations/endConversation';
import leaveConversation from 'API/Conversations/leaveConversation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conversationsSelectors, CurrentUserState } from '../../../State';
import { addSuccessMessage } from '../../../State/GlobalMessages/actionCreators';
import { ConfirmClosingConversation, ConfirmLeavingConversation } from '../ConfirmationPanel';
import { ConversationUsersPanel, RemoveUsersPanel } from '../ConversationUsersPanel';

const styles = require('./conversation-admin-panel.module.css');

interface ConversationAdminPanelProps {
    conversationId: number;
    closePanel: () => void;
}

type PanelViewStates = 0 | 1 | 2;
type ConfirmationViewStates = 0 | 1 | 2;

export const ConversationAdminPanel: React.FC<ConversationAdminPanelProps> = ({ conversationId, closePanel }) => {
    const dispatch = useDispatch();

    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);
    const conversationIsActive: boolean = useSelector(conversationsSelectors.conversationIsActive(conversationId));

    const [currentViewState, setCurrentViewState] = React.useState<PanelViewStates>(0);
    const [confirmationPanelViewState, setConfirmationPanelViewState] = React.useState<ConfirmationViewStates>(0);

    const close = () => {
        endConversation(conversationId).then(() => {
            dispatch(addSuccessMessage('Conversation closed.'));
        });

        closePanel();
    };

    const leave = () => {
        leaveConversation(conversationId).then(() => {
            dispatch(addSuccessMessage('You have left the conversation.'));
        });

        closePanel();
    };

    const resetConfirmationView = () => {
        setConfirmationPanelViewState(0);
    };

    const togglePanel = (confirmationViewState: ConfirmationViewStates) => {
        if (confirmationPanelViewState !== confirmationViewState) {
            setConfirmationPanelViewState(confirmationViewState);
        }
    };

    const viewStates = {
        1: <ConversationUsersPanel conversationId={conversationId} />,
        2: <RemoveUsersPanel conversationId={conversationId} />,
    };

    const confirmationViewStates = {
        1: <ConfirmClosingConversation confirm={close} cancel={resetConfirmationView} />,
        2: <ConfirmLeavingConversation confirm={leave} cancel={resetConfirmationView} />,
    };

    return (
        <>
            {conversationIsActive ? (
                <>
                    {currentViewState > 0 ? (
                        viewStates[currentViewState]
                    ) : (
                        <>
                            {confirmationPanelViewState > 0 ? (
                                confirmationViewStates[confirmationPanelViewState]
                            ) : (
                                <div className={styles.ConversationAdminPanel}>
                                    {!currentUserIsTenant && (
                                        <p
                                            onClick={() => {
                                                togglePanel(1);
                                            }}
                                        >
                                            Close Conversation
                                        </p>
                                    )}
                                    <p
                                        onClick={() => {
                                            togglePanel(2);
                                        }}
                                    >
                                        Leave Conversation
                                    </p>
                                    <p
                                        onClick={() => {
                                            setCurrentViewState(1);
                                        }}
                                    >
                                        Add Users
                                    </p>
                                    <p
                                        onClick={() => {
                                            setCurrentViewState(2);
                                        }}
                                    >
                                        Remove Users
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : null}
        </>
    );
};
