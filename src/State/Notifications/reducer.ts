import { NotificationsActions, NotificationsActionTypes } from './actions';
import { NotificationsState } from './Types';

export const initialState: NotificationsState = {
    count: 0,
};

export function notificationsReducer(
    state: NotificationsState = initialState,
    action: NotificationsActionTypes,
): NotificationsState {
    switch (action.type) {
    case NotificationsActions.SET_COUNT: {
        return {
            ...state,
            count: action.payload,
        };
    }
    case NotificationsActions.DECREASE_COUNT: {
        return {
            ...state,
            count: state.count - action.payload,
        };
    }
    default: {
        return state;
    }
    }
}
