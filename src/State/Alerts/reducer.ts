import { AlertsState } from "./Types/AlertsState";

import { AlertActions, AlertsActionTypes } from "./actions";

const initialState: AlertsState = {
    alerts: [],
};

export function alertsReducer(state: AlertsState = initialState, action: AlertsActionTypes): AlertsState {
    switch (action.type) {
        case AlertActions.ADD_ALERT:
            return {
                alerts: [...state.alerts, action.payload.message],
            };
        default:
            return {
                ...state,
            };
    }
}
