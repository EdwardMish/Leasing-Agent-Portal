import {
    Conversation,
    ConversationMessage,
    ConversationParticipant,
    ConversationUserReference,
    WrappedConversationEvent
} from '../../Types';

export const LOAD_CONVERSATIONS = 'LOAD_CONVERSATIONS'
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS'

export const LOAD_AVAILABLE_USERS = 'LOAD_AVAILABLE_USERS'
export const SET_AVAILABLE_USERS = 'SET_AVAILABLE_USERS'

export const LOAD_CONVERSATION_EVENTS = 'LOAD_CONVERSATION_EVENTS'
export const SET_CONVERSATION_EVENTS = 'SET_CONVERSATION_EVENTS'

export const LOAD_CONVERSTION_PARTICIPANTS = 'LOAD_CONVERSTION_PARTICIPANTS'
export const SET_CONVERSTION_PARTICIPANTS = 'SET_CONVERSTION_PARTICIPANTS'

export const ADD_CONVERSATION = 'ADD_CONVERSATION'
export const ADD_EVENT_TO_CONVERSATION = 'ADD_EVENT_TO_CONVERSATION'
export const ADD_PARTICIPANT_TO_CONVERSATION = 'ADD_PARTICIPANT_TO_CONVERSATION'
export const SET_PARTICIPANT_INACTIVE = 'SET_PARTICIPANT_INACTIVE'
export const INCREMENT_UNREAD_MESSAGES = 'INCREMENT_UNREAD_MESSAGES'
export const CLEAR_UNREAD_MESSAGES = 'CLEAR_UNREAD_MESSAGES'
export const UPDATE_LAST_MESSAGE = 'UPDATE_LAST_MESSAGE'
export const SET_CONVERSATION_INACTIVE = 'SET_CONVERSATION_INACTIVE'
export const ADD_UNREAD_MESSAGE = 'ADD_UNREAD_MESSAGE'
export const UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT = 'UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT'

type ConversationId = number;

interface LoadConversationsAction {
    type: typeof LOAD_CONVERSATIONS;
}

interface SetConversationsAction {
    type: typeof SET_CONVERSATIONS;
    payload: Conversation[];
}

interface LoadAvailableUsersAction {
    type: typeof LOAD_AVAILABLE_USERS;
}

interface SetAvailableUsersAction {
    type: typeof SET_AVAILABLE_USERS;
    payload: {
        conversationId: ConversationId;
        availableUsers: ConversationUserReference[];
    }
}

interface LoadConversationEventsAction {
    type: typeof LOAD_CONVERSATION_EVENTS;
}

interface SetConversationEventsAction {
    type: typeof SET_CONVERSATION_EVENTS;
    payload: {
        conversationId: ConversationId;
        events: WrappedConversationEvent[];
    }
}

interface LoadConversationParticipantsAction {
    type: typeof LOAD_CONVERSTION_PARTICIPANTS;
}

interface SetConversationParticipantsAction {
    type: typeof SET_CONVERSTION_PARTICIPANTS;
    payload: {
        conversationId: ConversationId;
        participants: ConversationParticipant[];
    }
}

interface AddEventToConversationAction {
    type: typeof ADD_EVENT_TO_CONVERSATION;
    payload: {
        conversationId: ConversationId;
        event: WrappedConversationEvent;
    }
}

interface AddParticipantToConversationAction {
    type: typeof ADD_PARTICIPANT_TO_CONVERSATION;
    payload: {
        conversationId: ConversationId;
        participant: ConversationParticipant;
    }
}

interface AddConversationAction {
    type: typeof ADD_CONVERSATION;
    payload: Conversation;
}

interface SetParticipantInactiveAction {
    type: typeof SET_PARTICIPANT_INACTIVE;
    payload: {
        conversationId: ConversationId;
        participantId: number;
    }
}

interface IncrementUnreadMessagesAction {
    type: typeof INCREMENT_UNREAD_MESSAGES;
    payload: number;
}

interface ClearUnreadMessagesAction {
    type: typeof CLEAR_UNREAD_MESSAGES;
    payload: ConversationId;
}

interface UpdateLastMessageAction {
    type: typeof UPDATE_LAST_MESSAGE;
    payload: {
        conversationId: ConversationId;
        message: ConversationMessage;
    }
}

interface SetConversationInactiveAction {
    type: typeof SET_CONVERSATION_INACTIVE;
    payload: ConversationId;
}

interface UpdateLastMessageReadForParticipant {
    type: typeof UPDATE_LAST_MESSAGE_READ_FOR_PARTICIPANT;
    payload: {
        conversationId: ConversationId;
        participantId: number;
        messageId: number; 
    };
}

export type ConversationsActionTypes =
    LoadConversationsAction
    | SetConversationsAction
    | LoadAvailableUsersAction
    | SetAvailableUsersAction
    | LoadConversationEventsAction
    | SetConversationEventsAction
    | LoadConversationParticipantsAction
    | SetConversationParticipantsAction
    | AddEventToConversationAction
    | AddParticipantToConversationAction
    | AddConversationAction
    | SetParticipantInactiveAction
    | IncrementUnreadMessagesAction
    | ClearUnreadMessagesAction
    | UpdateLastMessageAction
    | SetConversationInactiveAction
    | UpdateLastMessageReadForParticipant;
