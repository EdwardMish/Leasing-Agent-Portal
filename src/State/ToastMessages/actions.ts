import { ToastMessage, ToastMessageTrigger } from './Types'

export enum ToastMessageActions {
    ADD_MESSAGE = 'ADD_MESSAGE',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
    ADD_TRIGGER = 'ADD_TRIGGER',
    REMOVE_TRIGGER = 'REMOVE_TRIGGER'
}

type ToastMessageId = number
type TriggerId = number

interface AddMessage {
    type: typeof ToastMessageActions.ADD_MESSAGE;
    payload: ToastMessage;
}

interface RemoveMessage {
    type: typeof ToastMessageActions.REMOVE_MESSAGE;
    payload: ToastMessageId;
}

interface AddTrigger {
    type: typeof ToastMessageActions.ADD_TRIGGER;
    payload: ToastMessageTrigger;
}

interface RemoveTrigger {
    type: typeof ToastMessageActions.REMOVE_TRIGGER;
    payload: TriggerId;
}

export type ToastMessageActionTypes = AddMessage
    | RemoveMessage
    | AddTrigger
    | RemoveTrigger