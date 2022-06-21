import getAllConversations from 'API/Conversations/getAllConversations';
import { PECOLogo } from 'Core/PECOLogo';
import { UserAvatar } from 'Core/UserPanel';
import { Close, Menu, MessageCircle, Tasks } from 'Icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { conversationsActions, conversationsSelectors, Tasks as TasksState } from 'State';
import { Conversation, LoadStatus } from 'Types';
import styles from './header.module.css';

interface HeaderProps {
    navIsOpen: boolean;
    setRightPanelViewState: (viewState: number) => void;
    toggleNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ children, navIsOpen, setRightPanelViewState, toggleNav }) => {
    const dispatch = useDispatch();

    const conversationLoadStatus = useSelector(conversationsSelectors.conversationsLoadStatus);
    const unreadMessageCount = useSelector(conversationsSelectors.unreadMessageCount);

    const { tasksCount } = TasksState.Hooks.useTasksFromTasksState();

    React.useEffect(() => {
        if (conversationLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: conversationsActions.LOAD_CONVERSATIONS,
            });

            getAllConversations()
                .then((conversations: Conversation[]) => {
                    dispatch({
                        type: conversationsActions.SET_CONVERSATIONS,
                        payload: conversations,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [conversationLoadStatus]);

    return (
        <>
            <header className={styles.Header}>
                <div className={styles.MenuIcon} onClick={toggleNav} id="navigationPanelButtons">
                    {navIsOpen ? <Close aspect="1.5rem" /> : <Menu />}
                </div>
                <div className={styles.Logo}>
                    <Link to="/">
                        <PECOLogo />
                    </Link>
                </div>
                <div className={styles.HeaderLinks} id="rightPanelButtons">
                    <div className={styles.ConversationIcon} onClick={() => setRightPanelViewState(3)}>
                        <Tasks />
                        {tasksCount > 0 && <span>{tasksCount}</span>}
                    </div>
                    <div className={styles.ConversationIcon} onClick={() => setRightPanelViewState(2)}>
                        <MessageCircle />
                        {unreadMessageCount > 0 && <span>{unreadMessageCount}</span>}
                    </div>
                    <div className={styles.UserAvatar} onClick={() => setRightPanelViewState(1)}>
                        <UserAvatar />
                    </div>
                </div>
            </header>
            {children}
        </>
    );
};

