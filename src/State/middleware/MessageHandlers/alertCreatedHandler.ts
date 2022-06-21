import { Streams } from '../../../Types'
import { AlertActions, AlertsActionTypes } from '../../Alerts/actions'

export const alertCreatedHandler = (
    event: Streams.AlertCreatedEvent,
    dispatch) => {

    dispatch({
        type: AlertActions.ADD_ALERT,
        payload: {
            message: event.Message
        }
    } as AlertsActionTypes)
}
