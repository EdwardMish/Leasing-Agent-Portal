import { ToastMessageState } from './Types'
import { ToastMessageActions, ToastMessageActionTypes } from './actions'

const initialState: ToastMessageState = {
    messages: [],
    triggers: []
}

export function toastMessageReducer(state: ToastMessageState = initialState, action: ToastMessageActionTypes): ToastMessageState {
    switch (action.type) {
        case ToastMessageActions.ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        case ToastMessageActions.REMOVE_MESSAGE:
            const rmMessageIndex = state.messages.findIndex((m) => m.id === action.payload)

            if (rmMessageIndex === -1) {
                return state
            }

            return {
                ...state,
                messages: [
                    ...state.messages.slice(0, rmMessageIndex),
                    ...state.messages.slice(rmMessageIndex + 1)
                ]
            }
        case ToastMessageActions.ADD_TRIGGER:
            return {
                ...state,
                triggers: [
                    ...state.triggers,
                    action.payload
                ]
            }
        case ToastMessageActions.REMOVE_TRIGGER:
            const rtMessageIndex = state.messages.findIndex((t) => t.id === action.payload)

            if (rtMessageIndex === -1) {
                return state
            }

            return {
                ...state,
                triggers: [
                    ...state.triggers.slice(0, rtMessageIndex),
                    ...state.triggers.slice(rtMessageIndex + 1)
                ]
            }
        default:
            return state;
    }
}