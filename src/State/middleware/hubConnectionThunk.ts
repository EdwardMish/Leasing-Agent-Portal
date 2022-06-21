import { Streams, State } from '../../Types';

import { conversationMessageReadHandler } from './MessageHandlers/conversationMessageReadHandler';

import { conversationEndedHandler } from './MessageHandlers/conversationEndedHandler';
import { messageSentToConversationHandler } from './MessageHandlers/messageSentToConversationHandler';
import { participantJoinedConversationHandler } from './MessageHandlers/participantJoinedConversationHandler';
import { participantLeftConversationHandler } from './MessageHandlers/participantLeftConversationHandler';
import { participantWasInvitedToConversationHandler } from './MessageHandlers/participantWasInvitedToConversationHandler';
import { participantWasRemovedFromConversationHandler } from './MessageHandlers/participantWasRemovedFromConversationHandler';
import { alertCreatedHandler } from './MessageHandlers/alertCreatedHandler';

declare const $: any;

const serverMethods = {
    AlertCreated: 'alertCreated',
    ConversationEnded: 'conversationEnded',
    ConversationMessageRead: 'conversationMessageRead',
    MessageSentToConversation: 'messageSentToConversation',
    ParticipantJoinedConversation: 'participantJoinedConversation',
    ParticipantLeftConversation: 'participantLeftConversation',
    ParticipantWasRemovedFromConversation: 'participantWasRemovedFromConversation',
    ParticipantWasInvitedToConversation: 'participantWasInvitedToConversation',
};

const hubConnectionThunk = (token: string) => (dispatch, getState) => {
    const connection = $.hubConnection(`${API_ROOT}/signalr`, { useDefaultPath: false });

    connection.qs = { token };

    const hubProxy = connection.createHubProxy('conversationHub');

    hubProxy.on(serverMethods.AlertCreated, function (stream: Streams.AlertCreatedEvent) {
        alertCreatedHandler(stream, dispatch);
    });

    hubProxy.on(serverMethods.ConversationEnded, function (stream: Streams.ConversationEndedStreamMessage) {
        const { conversations }: State = getState();

        conversationEndedHandler(stream, conversations.conversations, dispatch);
    });

    hubProxy.on(
        serverMethods.ConversationMessageRead,
        function (stream: Streams.ConversationMessageReadStreamMessage) {
            const { currentUser }: State = getState();
            const { conversations }: State = getState();

            conversationMessageReadHandler(
                stream,
                conversations.conversations,
                conversations.conversationEvents,
                currentUser.currentUser.id,
                dispatch,
            );
        },
    );

    hubProxy.on(
        serverMethods.MessageSentToConversation,
        function (stream: Streams.MessageSentToConversationStreamMessage) {
            const { conversations }: State = getState();
            const { currentUser }: State = getState();

            messageSentToConversationHandler(
                stream,
                conversations.conversations,
                conversations.conversationEvents,
                currentUser.currentUser.id,
                dispatch,
            );
        },
    );

    hubProxy.on(
        serverMethods.ParticipantJoinedConversation,
        function (stream: Streams.ParticipantJoinedConversationStreamMessage) {
            const { conversations: conversationsState }: State = getState();
            const { currentUser }: State = getState();

            const { conversations, conversationEvents, conversationParticipants } = conversationsState;

            participantJoinedConversationHandler(
                stream,
                conversations,
                conversationEvents,
                conversationParticipants,
                currentUser.currentUser.id,
                dispatch,
            );
        },
    );

    hubProxy.on(
        serverMethods.ParticipantLeftConversation,
        function (stream: Streams.ParticipantLeftConversationStreamMessage) {
            const { currentUser }: State = getState();

            participantLeftConversationHandler(stream, currentUser.currentUser.id, dispatch);
        },
    );

    hubProxy.on(
        serverMethods.ParticipantWasInvitedToConversation,
        function (stream: Streams.ParticipantWasInvitedToConversationStreamMessage) {
            const { conversations: conversationsState }: State = getState();
            const { currentUser }: State = getState();

            const { conversations, conversationEvents, conversationParticipants } = conversationsState;

            participantWasInvitedToConversationHandler(
                stream,
                conversations,
                conversationEvents,
                conversationParticipants,
                currentUser.currentUser.id,
                dispatch,
            );
        },
    );

    hubProxy.on(
        serverMethods.ParticipantWasRemovedFromConversation,
        function (stream: Streams.ParticipantWasRemovedFromConversationStreamMessage) {
            const { currentUser }: State = getState();

            participantWasRemovedFromConversationHandler(stream, currentUser.currentUser.id, dispatch);
        },
    );

    connection
        .start()
        .done(function () {})
        .fail(function () {});

    connection.error(function () {});

    return (next) => (action) => next(action);
};

export default hubConnectionThunk;
