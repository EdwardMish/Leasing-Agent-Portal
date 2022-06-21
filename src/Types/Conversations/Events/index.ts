import { ConversationEventTypes } from './ConversationEventTypes';

import { ConversationEnded } from './ConversationEnded';
import { ConversationMessageRead } from './ConversationMessageRead';
import { MessageSentToConversation } from './MessageSentToConversation';
import { NewsConversationCreated } from './NewsConversationCreated';
import { ParticipantJoinedConversation } from './ParticipantJoinedConversation';
import { ParticipantLeftConversation } from './ParticipantLeftConversation';
import { ParticipantWasInvitedToConversation } from './ParticipantWasInvitedToConversation';
import { ParticipantWasRemovedFromConversation } from './ParticipantWasRemovedFromConversation';

type ConversationEvents = ConversationEnded
    | ConversationMessageRead
    | MessageSentToConversation
    | NewsConversationCreated
    | ParticipantJoinedConversation
    | ParticipantLeftConversation
    | ParticipantWasInvitedToConversation
    | ParticipantWasRemovedFromConversation

export {
    ConversationEvents,
    ConversationEventTypes,
    ConversationEnded,
    ConversationMessageRead,
    MessageSentToConversation,
    NewsConversationCreated,
    ParticipantJoinedConversation,
    ParticipantLeftConversation,
    ParticipantWasInvitedToConversation,
    ParticipantWasRemovedFromConversation,
};
