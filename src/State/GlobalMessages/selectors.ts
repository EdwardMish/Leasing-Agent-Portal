import { createSelector } from 'reselect';

import { InterfaceMessage, GlobalMessageState, State } from '../../Types';

const globalMessageState = ({ globalMessages }: State) => globalMessages

export const globalMessages = createSelector(
    globalMessageState,
    ({ messages }: GlobalMessageState) => messages
)

export const globalMessageList = createSelector(
    globalMessages,
    (messages: Record<number, InterfaceMessage>) => Object.values(messages)
)

export const globalMessageById = (messageId: number) => createSelector(
    globalMessages,
    (messages: Record<number, InterfaceMessage>) => messages[messageId]
)