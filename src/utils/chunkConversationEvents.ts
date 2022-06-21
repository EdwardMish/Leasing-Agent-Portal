import { format } from 'date-fns';

import { ConversationStreamEvent } from '../Types/Conversations';
import { ChunkedEvents } from '../Features/Conversations/Types';

export const chunkConversationEvents = (conversationEvents: ConversationStreamEvent[]): ChunkedEvents => {
    const chunked: ChunkedEvents = conversationEvents.reduce(
        (chunks: ChunkedEvents, current: ConversationStreamEvent) => {
            const eventDate: string = format(
                new Date(current.event.metadata.eventDate),
                'eeee, LLLL do, yyyy',
            );

            return {
                ...chunks,
                [eventDate]: [...(chunks[eventDate] || []), current],
            };
        },
        {},
    );

    return chunked;
};
