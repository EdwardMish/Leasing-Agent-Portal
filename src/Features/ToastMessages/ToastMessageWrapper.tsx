import * as React from 'react'
import { useSelector } from 'react-redux'

import { ToastMessages } from '../../State'
import { ToastMessage } from './ToastMessage'

const styles = require('./toast-message-wrapper.module.css')

export const ToastMessageWrapper: React.FC<{}> = () => {
    const messages: ToastMessages.Types.ToastMessage[] = useSelector(ToastMessages.selectors.toastMessages)

    return (
        <div className={styles.ToastMessageWrapper}>
            { messages.map((toastMessage: ToastMessages.Types.ToastMessage) => <ToastMessage key={`toast-message-${toastMessage.id}`} toastMessage={toastMessage} />)}
        </div>
    )
}