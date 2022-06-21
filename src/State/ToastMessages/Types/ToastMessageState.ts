import { ToastMessage } from './ToastMessage'
import { ToastMessageTrigger } from './ToastMessageTrigger'

export interface ToastMessageState {
    messages: ToastMessage[];
    triggers: ToastMessageTrigger[];
}