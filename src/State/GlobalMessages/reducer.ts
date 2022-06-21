import { GlobalMessage, GlobalMessageState } from '../../Types';
import { GlobalMessageActionTypes, GlobalMessagesActions } from './actions';


export const initialState: GlobalMessageState = {
    messages: {}
};

export function globalMessageReducer(state: GlobalMessageState = initialState, action: GlobalMessageActionTypes): GlobalMessageState {
    switch (action.type) {
        case GlobalMessagesActions.ADD_MESSAGE:
            const timeStamp = Date.now()

            return {
                ...state,
                messages: {
                    ...state.messages,
                    [timeStamp]: {
                        ...action.payload,
                        id: timeStamp
                    }
                }
            }
        case GlobalMessagesActions.REMOVE_MESSAGE:
            return {
                ...state,
                messages: Object.values(state.messages)
                    .reduce((messages: Record<number, GlobalMessage>, gm: GlobalMessage) => gm.id === action.payload
                        ? messages
                        : {
                            ...messages,
                            [gm.id]: {
                                ...state.messages[gm.id]
                            }
                        }, {})
            }
        default:
            return state
    }
}