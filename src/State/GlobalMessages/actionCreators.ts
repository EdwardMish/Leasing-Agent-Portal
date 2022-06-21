import { InterfaceMessageTypes } from '../../Types'
import { GlobalMessageActionTypes, GlobalMessagesActions } from './actions'

type SetMessageFunction = (message: string, secondaryMessage?: string) => (type: InterfaceMessageTypes) => GlobalMessageActionTypes

const setMessage: SetMessageFunction = (message: string, secondaryMessage?: string) => !!secondaryMessage && !!secondaryMessage.length
    ? (messageType: InterfaceMessageTypes) => ({
        type: GlobalMessagesActions.ADD_MESSAGE,
        payload: {
            message,
            secondaryMessage,
            messageType
        }
    })
    : (messageType: InterfaceMessageTypes) => ({
        type: GlobalMessagesActions.ADD_MESSAGE,
        payload: {
            message,
            messageType
        }
    })

export const addSuccessMessage = (message: string, secondaryMessage?: string): GlobalMessageActionTypes => setMessage(message, secondaryMessage)(InterfaceMessageTypes.SUCCESS)

export const addErrorMessage = (message: string, secondaryMessage?: string): GlobalMessageActionTypes => setMessage(message, secondaryMessage)(InterfaceMessageTypes.ERROR)