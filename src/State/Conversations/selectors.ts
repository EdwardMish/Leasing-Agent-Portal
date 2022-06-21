import { createSelector } from 'reselect';
import {
    Conversation,
    ConversationParticipant,
    ConversationStreamEvent,
    ConversationUserReference,
    LoadStatus,
    State,
    StateRecord,
    WrappedConversationEvent
} from '../../Types';
import { ConversationEventTypes } from '../../Types/Conversations/Events';
import { ConversationsState } from './Types/ConversationsState';

const conversationsState = ({ conversations }: State) => conversations;

/*
 * Conversations
 */
const conversationsStateRecord = createSelector(
    conversationsState,
    ({ conversations }: ConversationsState) => conversations
)

export const conversationsLoadStatus = createSelector(
    conversationsStateRecord,
    ({ loadStatus }) => loadStatus
)

export const conversations = createSelector(
    conversationsStateRecord,
    (conversationsStateRecord) => Object.values(conversationsStateRecord).filter((c: LoadStatus | Conversation) => typeof c === 'object')
)

export const conversationsAreLoaded = createSelector(
    conversationsLoadStatus,
    (loadStatus: LoadStatus) => loadStatus === LoadStatus.LOADED
)

export const conversation = (conversationId: number) => createSelector(
    conversationsStateRecord,
    (conversations: StateRecord<Conversation>) => conversations[conversationId] || {}
)

export const conversationsByActive = (isActiveFilter: boolean) => createSelector(
    conversations,
    (conversations: Conversation[]) => conversations.filter((c: Conversation) => c.isActive === isActiveFilter)
)

export const conversationIsLoaded = (conversationId: number) => createSelector(
    conversationsStateRecord,
    (conversations: StateRecord<Conversation>) => conversations.hasOwnProperty(conversationId)
)

export const unreadMessageCount = createSelector(
    conversationsByActive(true),
    (conversations) => conversations
        .map((c: LoadStatus | Conversation) => typeof c === 'object' && c.hasOwnProperty('unreadMessages') ? c.unreadMessages : 0)
        .reduce((agg: number, curr: number) => agg += curr, 0)
)

export const conversationTopic = (conversationId: number) => createSelector(
    conversation(conversationId),
    ({ topic = '' }: Conversation) => topic
)

export const lastMessageId = (conversationId: number) => createSelector(
    conversationsStateRecord,
    (conversationRecord: StateRecord<Conversation>) => conversationRecord.hasOwnProperty(conversationId) ? conversationRecord[conversationId].lastMessage.id : 0
)

/*
 * Available Users
 */
const availableUsersStateRecord = createSelector(
    conversationsState,
    ({ availableUsers }: ConversationsState) => availableUsers
)

export const availableUsersLoadStatus = createSelector(
    availableUsersStateRecord,
    ({ loadStatus }) => loadStatus
)

export const availableUsersForConversation = (conversationId: number) => createSelector(
    availableUsersStateRecord,
    (availableUsers: Record<number, ConversationUserReference[]>) => availableUsers[conversationId] || []
)

export const availableUsersLoadedForConversation = (conversationId: number) => createSelector(
    availableUsersStateRecord,
    (availableUsers: Record<number, ConversationUserReference[]>) => availableUsers.hasOwnProperty(conversationId)
)

/*
 * Events
 */
export const conversationEvents = createSelector(
    conversationsState,
    ({ conversationEvents }) => conversationEvents
)

export const conversationEventsLoadStatus = createSelector(
    conversationEvents,
    ({ loadStatus }) => loadStatus
)

export const eventsForConversation = (conversationId: number) => createSelector(
    conversationEvents,
    (conversationEvents) => conversationEvents[conversationId] || []
)

export const eventsLoadedForConversation = (conversationId: number) => createSelector(
    conversationEvents,
    (conversationEvents) => conversationEvents.hasOwnProperty(conversationId)
)

export const conversationMetaEvent = (conversationId: number) => createSelector(
    eventsForConversation(conversationId),
    (events: ConversationStreamEvent[]) => events
        .find((e: ConversationStreamEvent) =>
            e.type === ConversationEventTypes.ConversationCreated
            || e.type === ConversationEventTypes.NewsConversationCreated
        )
)

export const conversationMessageEvents = (conversationId: number) => createSelector(
    eventsForConversation(conversationId),
    (events) => events.filter((e: WrappedConversationEvent) => e.type === ConversationEventTypes.MessageSentToConversation)
)

/*
 * Participants
 */
export const conversationParticipants = createSelector(
    conversationsState,
    ({ conversationParticipants }: ConversationsState) => conversationParticipants
)

export const conversationParticipantsLoadStatus = createSelector(
    conversationParticipants,
    ({ loadStatus }) => loadStatus
)

export const participantsForConversation = (conversationId: number) => createSelector(
    conversationParticipants,
    (conversationParticipants) => conversationParticipants[conversationId] || []
)

export const conversationParticipant = (conversationId: number, userId: number) => createSelector(
    participantsForConversation(conversationId),
    (participants: ConversationParticipant[]) => participants?.find((p) => p.userId === userId) || undefined
)

export const participantsLoadedForConversation = (conversationId: number) => createSelector(
    conversationParticipants,
    (conversationParticipants) => conversationParticipants.hasOwnProperty(conversationId)
)

export const lastMessageReadForParticipant = (conversationId: number, userId: number) => createSelector(
    conversationParticipant(conversationId, userId),
    (participant: ConversationParticipant | undefined) => participant && participant.hasOwnProperty('lastMessageIdRead') ? participant.lastMessageIdRead : -1
)

/*
 * Full State
 */
export const conversationIsActive = (conversationId: number) => createSelector(
    conversationsState,
    ({ conversations, conversationEvents }: ConversationsState) =>
        // Rely first on conversation in state
        conversations.hasOwnProperty(conversationId)
            ? conversations[conversationId].isActive
            // If events are populated, reference events
            : conversationEvents.hasOwnProperty(conversationId)
                ? !(conversationEvents[conversationId].some((e: ConversationStreamEvent) => e.type === ConversationEventTypes.ConversationEnded))
                : false
)