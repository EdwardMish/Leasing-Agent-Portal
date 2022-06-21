import * as React from 'react';
import { useSelector } from 'react-redux';

import { conversationsSelectors } from '../../../State';
import { Conversation } from '../../../Types';
import { LoadingContent } from '../../../Shared/PageElements';
import { ArrowDownCircle, ArrowUpCircle, IconColors } from 'Icons';

const styles = require('../conversations.module.css');

interface ConversationListProps {
    setCurrentConversation: (conversationId: number) => void;
    showActive: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({ setCurrentConversation, showActive }) => {
    const conversations: Conversation[] = useSelector(conversationsSelectors.conversationsByActive(showActive));

    const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');

    const handleScrollButton = () => {
        const conversations = document.getElementById('conversations');
        if (conversations) {
            if (scrollDirection === 'down' && conversations?.scrollHeight) {
                conversations.scrollTop = conversations?.scrollHeight;
                setScrollDirection('up');
            } else {
                conversations.scrollTop = 0;
                setScrollDirection('down');
            }
        }
    };

    const ScrollButton = ({ scrollDirection }) => {
        return scrollDirection === 'down' ? (
            <ArrowDownCircle aspect="3rem" color={IconColors.BrandBlue} />
        ) : (
            <ArrowUpCircle aspect="3rem" color={IconColors.BrandBlue} />
        );
    };

    return (
        <>
            {!!conversations.length ? (
                <>
                    <div className={styles.ScrollButton} onClick={handleScrollButton}>
                        {conversations.length > 10 ? <ScrollButton scrollDirection={scrollDirection} /> : <></>}
                    </div>
                    <ul className={`${styles.ConversationsList} ${styles.ScrollWrapper}`} id="conversations">
                        {conversations
                            .sort((a: Conversation, b: Conversation) => b.unreadMessages - a.unreadMessages)
                            .map(({ id, lastMessage, topic, unreadMessages }: Conversation) => (
                                <li
                                    key={`conversation-${id}`}
                                    className={styles.ConversationItem}
                                    onClick={() => {
                                        setCurrentConversation(id);
                                    }}
                                >
                                    <p className={styles.Topic}>{topic}</p>
                                    <p className={styles.Message}>{lastMessage.content}</p>
                                    {unreadMessages > 0 && <p className={styles.UnreadMessageIndicator}>{unreadMessages}</p>}
                                </li>
                            ))}
                    </ul>
                </>
            ) : (
                <div className={styles.LoadingWrapper}>
                    <LoadingContent message="You are not currently involved in any conversations." />
                </div>
            )}
        </>
    );
};

