import { LoadStatus, Conversation, ConversationParticipant } from '../../Types';

import {
    ConversationsActionTypes,
    LOAD_CONVERSATIONS,
    SET_CONVERSATIONS,
    LOAD_AVAILABLE_USERS,
    SET_AVAILABLE_USERS,
    LOAD_CONVERSATION_EVENTS,
    SET_CONVERSATION_EVENTS,
    LOAD_CONVERSTION_PARTICIPANTS,
    SET_CONVERSTION_PARTICIPANTS,
    ADD_CONVERSATION,
    ADD_EVENT_TO_CONVERSATION,
    ADD_PARTICIPANT_TO_CONVERSATION,
    SET_PARTICIPANT_INACTIVE,
    INCREMENT_UNREAD_MESSAGES,
    CLEAR_UNREAD_MESSAGES,
    UPDATE_LAST_MESSAGE,
    SET_CONVERSATION_INACTIVE,
    UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT,
} from './actions';
import { ConversationsState } from './Types/ConversationsState';

export const initialState: ConversationsState = {
    availableUsers: { loadStatus: LoadStatus.INITIAL_STATE },
    conversations: { loadStatus: LoadStatus.INITIAL_STATE },
    conversationEvents: { loadStatus: LoadStatus.INITIAL_STATE },
    conversationParticipants: { loadStatus: LoadStatus.INITIAL_STATE }
};

export function conversationsReducer(state: ConversationsState = initialState, action: ConversationsActionTypes): ConversationsState {
    switch (action.type) {
        case LOAD_CONVERSATIONS:
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    loadStatus: LoadStatus.PENDING
                }
            }
        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce((agg: Record<number, Conversation>, curr: Conversation) => ({
                        ...agg,
                        [curr.id]: curr
                    }), {})
                }
            }
        case LOAD_AVAILABLE_USERS:
            return {
                ...state,
                availableUsers: {
                    ...state.availableUsers,
                    loadStatus: LoadStatus.PENDING
                }
            }
        case SET_AVAILABLE_USERS:
            return {
                ...state,
                availableUsers: {
                    ...state.availableUsers,
                    loadStatus: LoadStatus.LOADED,
                    [action.payload.conversationId]: action.payload.availableUsers
                }
            }
        case LOAD_CONVERSATION_EVENTS:
            return {
                ...state,
                conversationEvents: {
                    ...state.conversationEvents,
                    loadStatus: LoadStatus.PENDING
                }
            }
        case SET_CONVERSATION_EVENTS:
            return {
                ...state,
                conversationEvents: {
                    ...state.conversationEvents,
                    loadStatus: LoadStatus.LOADED,
                    [action.payload.conversationId]: action.payload.events
                }
            }
        case LOAD_CONVERSTION_PARTICIPANTS:
            return {
                ...state,
                conversationParticipants: {
                    ...state.conversationParticipants,
                    loadStatus: LoadStatus.PENDING
                }
            }
        case SET_CONVERSTION_PARTICIPANTS:
            return {
                ...state,
                conversationParticipants: {
                    ...state.conversationParticipants,
                    loadStatus: LoadStatus.LOADED,
                    [action.payload.conversationId]: action.payload.participants
                }
            }
        case ADD_EVENT_TO_CONVERSATION:
            if (!(!!state.conversationEvents[action.payload.conversationId])) return state

            return {
                ...state,
                conversationEvents: {
                    ...state.conversationEvents,
                    [action.payload.conversationId]: [
                        ...state.conversationEvents[action.payload.conversationId],
                        action.payload.event
                    ]
                }
            }
        case ADD_PARTICIPANT_TO_CONVERSATION:
            if (!(!!state.conversationParticipants[action.payload.conversationId])) return state

            return {
                ...state,
                conversationParticipants: {
                    ...state.conversationParticipants,
                    [action.payload.conversationId]: [
                        ...state.conversationParticipants[action.payload.conversationId],
                        action.payload.participant
                    ]
                }
            }
        case ADD_CONVERSATION:
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action.payload.id]: action.payload
                }
            }
        case SET_PARTICIPANT_INACTIVE:
            if (!(!!state.conversationParticipants[action.payload.conversationId])) return state

            const spiParticipants = state.conversationParticipants[action.payload.conversationId]
            const spiParticipantIndex = spiParticipants.findIndex((p: ConversationParticipant) => p.userId === action.payload.participantId)

            if (spiParticipantIndex < 0) return state

            return {
                ...state,
                conversationParticipants: {
                    ...state.conversationParticipants,
                    [action.payload.conversationId]: [
                        ...spiParticipants.slice(0, spiParticipantIndex),
                        ...spiParticipants.slice(spiParticipantIndex + 1),
                        {
                            ...spiParticipants[spiParticipantIndex],
                            isActive: false
                        }
                    ]
                }
            }
        case INCREMENT_UNREAD_MESSAGES:
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action.payload]: {
                        ...state.conversations[action.payload],
                        unreadMessages: (state.conversations[action.payload].unreadMessages + 1)
                    }
                }
            }
        case CLEAR_UNREAD_MESSAGES:
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action.payload]: {
                        ...state.conversations[action.payload],
                        unreadMessages: 0
                    }
                }
            }
        case UPDATE_LAST_MESSAGE:
            if (!(!!state.conversations[action.payload.conversationId])) return state

            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action.payload.conversationId]: {
                        ...state.conversations[action.payload.conversationId],
                        lastMessage: action.payload.message
                    }
                }
            }
        case SET_CONVERSATION_INACTIVE:
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action.payload]: {
                        ...state.conversations[action.payload],
                        isActive: false
                    }
                }
            }
        case UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT:
            return {
                ...state
            }
        default:
            return state
    }
}