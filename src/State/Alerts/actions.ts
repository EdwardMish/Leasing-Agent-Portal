export enum AlertActions {
    ADD_ALERT = 'ALERTS_ADD_ALERT',
}

interface AddAlertAction {
    type: typeof AlertActions.ADD_ALERT;
    payload: {
        message: string;
    }
}

export type AlertsActionTypes =
    AddAlertAction;
