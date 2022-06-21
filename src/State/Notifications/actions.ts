export enum NotificationsActions {
    SET_COUNT = 'NOTIFICATIONS_SET_COUNT',
    DECREASE_COUNT = 'NOTIFICATIONS_DECREASE_COUNT'
}

interface SetCountAction {
    type: typeof NotificationsActions.SET_COUNT;
    payload: number;
}

interface DecreaseCountAction {
    type: typeof NotificationsActions.DECREASE_COUNT;
    payload: number;
}

export type NotificationsActionTypes =
    SetCountAction
    | DecreaseCountAction
