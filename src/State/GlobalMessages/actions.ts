import { InterfaceMessage } from '../../Types';

export enum GlobalMessagesActions {
    ADD_MESSAGE = 'GLOBAL_MESSAGES_ADD_MESSAGE',
    REMOVE_MESSAGE = 'GLOBAL_MESSAGES_REMOVE_MESSAGE'
}

interface AddMessageAction {
    type: typeof GlobalMessagesActions.ADD_MESSAGE;
    payload: InterfaceMessage;
}

interface RemoveMessageAction {
    type: typeof GlobalMessagesActions.REMOVE_MESSAGE;
    payload: number;
}

export type GlobalMessageActionTypes =
    AddMessageAction
    | RemoveMessageAction;