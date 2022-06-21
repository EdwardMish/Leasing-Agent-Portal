import * as React from 'react';

import * as EventComponents from '../Events';

import {
    ConversationEvents,
    ConversationEnded,
    ConversationMessageRead,
    MessageSentToConversation,
    ParticipantJoinedConversation,
    ParticipantLeftConversation,
    ParticipantWasInvitedToConversation,
    ParticipantWasRemovedFromConversation,
} from '../../../Types/Conversations/Events';

import { ConversationStreamEvent } from '../../../Types';

const eventComponents = (eventType: string, event: ConversationEvents, conversationId: number) =>
    ({
        ConversationEnded: <EventComponents.ConversationEnded event={event as ConversationEnded} />,
        ConversationMessageRead: (
            <EventComponents.ConversationMessageRead event={event as ConversationMessageRead} />
        ),
        MessageSentToConversation: (
            <EventComponents.MessageSentToConversation
                event={event as MessageSentToConversation}
                conversationId={conversationId}
            />
        ),
        ParticipantJoinedConversation: (
            <EventComponents.ParticipantJoinedConversation
                event={event as ParticipantJoinedConversation}
                conversationId={conversationId}
            />
        ),
        ParticipantLeftConversation: (
            <EventComponents.ParticipantLeftConversation
                event={event as ParticipantLeftConversation}
                conversationId={conversationId}
            />
        ),
        ParticipantWasInvitedToConversation: (
            <EventComponents.ParticipantWasInvitedToConversation
                event={event as ParticipantWasInvitedToConversation}
                conversationId={conversationId}
            />
        ),
        ParticipantWasRemovedFromConversation: (
            <EventComponents.ParticipantWasRemovedFromConversation
                event={event as ParticipantWasRemovedFromConversation}
                conversationId={conversationId}
            />
        ),
    }[eventType] || null);

const eventKey = (event: ConversationEvents, type: string): string => {
    // @ts-ignore
    const { userId: eventUser = 0 } = event;

    return `event-chunk-${event.metadata.eventDate}-${type}-${eventUser}`;
};

const ConversationChunkItems = ({ chunks, conversationId }) => (
    <>
        {chunks.map(({ event, type }: ConversationStreamEvent) => (
            <li key={eventKey(event, type)}>{eventComponents(type, event, conversationId)}</li>
        ))}
    </>
);

export default ConversationChunkItems;
