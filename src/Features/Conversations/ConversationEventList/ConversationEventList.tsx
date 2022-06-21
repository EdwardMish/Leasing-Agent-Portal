import * as React from 'react';
import { useSelector } from 'react-redux';

import { conversationsSelectors } from '../../../State';
import { ConversationStreamEvent } from '../../../Types';
import { chunkConversationEvents } from '../../../utils';

import { ChunkedEvents } from '../Types';
import ConversationChunkItems from './ConversationChunkItems';

const styles = require('./conversation-event-list.module.css');

interface ConversationEventListProps {
    conversationId: number;
    hasDisclaimer: boolean;
}

const filterEvents = (eventsToFilter: ConversationStreamEvent[]): ConversationStreamEvent[] =>
    eventsToFilter.filter(
        ({ type }: ConversationStreamEvent) =>
            !(type === 'NewsConversationCreated' || type === 'ConversationMessageRead'),
    );

export const ConversationEventList: React.FC<ConversationEventListProps> = ({
    conversationId,
    hasDisclaimer,
}) => {
    const events: ConversationStreamEvent[] = useSelector(
        conversationsSelectors.eventsForConversation(conversationId),
    );

    const [eventChunks, setEventChunks] = React.useState<ChunkedEvents>(
        chunkConversationEvents(filterEvents(events)),
    );

    const scrollNode = React.useRef<HTMLLIElement>(null);

    React.useEffect(() => {
        if (scrollNode.current) {
            scrollNode.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [events.length]);

    React.useEffect(() => {
        setEventChunks(chunkConversationEvents(filterEvents(events)));
    }, [events.length]);

    return (
        <ul
            className={styles.ConversationEventList}
            style={{ height: hasDisclaimer ? 'calc(100% - 8.5rem)' : 'calc(100% - 6.5rem)' }}
        >
            {Object.keys(eventChunks).map((eventDate: string) => (
                <React.Fragment key={`event-date-${eventDate}`}>
                    <li className={styles.EventDate}>
                        <p>{eventDate}</p>
                    </li>
                    <ConversationChunkItems chunks={eventChunks[eventDate]} conversationId={conversationId} />
                </React.Fragment>
            ))}
            <li className={`${styles.Scroll}`} ref={scrollNode}></li>
        </ul>
    );
};
