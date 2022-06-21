import { ConversationEndedWrappedEvent } from './ConversationEndedWrappedEvent';
import { ConversationMessageReadWrappedEvent } from './ConversationMessageReadWrappedEvent';
import { MessageSentToConversationWrappedEvent } from './MessageSentToConversationWrappedEvent';
import { NewsConversationCreatedWrappedEvent } from './NewsConversationCreatedWrappedEvent';
import { ParticipantJoinedConversationWrappedEvent } from './ParticipantJoinedConversationWrappedEvent';
import { ParticipantLeftConversationWrappedEvent } from './ParticipantLeftConversationWrappedEvent';
import { ParticipantWasInvitedToConversationWrappedEvent } from './ParticipantWasInvitedToConversationWrappedEvent';
import { ParticipantWasRemovedFromConversationWrappedEvent } from './ParticipantWasRemovedFromConversationWrappedEvent';

type WrappedConversationEvent = ConversationEndedWrappedEvent
    | ConversationMessageReadWrappedEvent
    | MessageSentToConversationWrappedEvent
    | NewsConversationCreatedWrappedEvent
    | ParticipantJoinedConversationWrappedEvent
    | ParticipantLeftConversationWrappedEvent
    | ParticipantWasInvitedToConversationWrappedEvent
    | ParticipantWasRemovedFromConversationWrappedEvent

export {
    WrappedConversationEvent,
    ConversationEndedWrappedEvent,
    ConversationMessageReadWrappedEvent,
    MessageSentToConversationWrappedEvent,
    NewsConversationCreatedWrappedEvent,
    ParticipantJoinedConversationWrappedEvent,
    ParticipantLeftConversationWrappedEvent,
    ParticipantWasInvitedToConversationWrappedEvent,
    ParticipantWasRemovedFromConversationWrappedEvent,
};
