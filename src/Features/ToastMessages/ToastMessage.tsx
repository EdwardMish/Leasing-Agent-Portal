import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Transition } from 'react-transition-group'

import { Close } from '../../Icons'

import { ToastMessages } from '../../State'

const styles = require('./toast-message-wrapper.module.css')

interface ToastMessageProps {
    toastMessage: ToastMessages.Types.ToastMessage
}

const duration = 300
let timeout

const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    right: '1rem'
}

const transitionStyles = {
    entering: { right: '-25rem' },
    entered: { right: '1rem' },
    exiting: { right: '1rem' },
    exited: { right: '-25rem' },
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
    toastMessage
}) => {
    const dispatch = useDispatch()

    const { 
        id,
        title,
        message,
        action = undefined
    } = toastMessage

    const [componentIn, toggleComponentIn] = React.useState<boolean>(false)

    const closeMessage = () => {
        toggleComponentIn(false)
        
        dispatch({
            type: ToastMessages.Actions.REMOVE_MESSAGE,
            payload: id
        } as ToastMessages.ActionTypes)

        clearTimeout(timeout)
    }

    const handleAction = (func) => {
        func()

        closeMessage()
    }

    React.useEffect(() => {
        toggleComponentIn(true)

        timeout = setTimeout(() => { closeMessage() }, 10000)
    }, [])

    return (
        <Transition in={componentIn} timeout={duration}>
            {state => (
                <div
                    className={styles.ToastMessage}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    <div className={styles.ToastMessageIcon} onClick={closeMessage}><Close aspect='1rem' /></div>
                    <h2>{title}</h2>
                    <p>{message}</p>
                    { action && <p className={styles.Action} onClick={() => { handleAction(action.func); }}>{action.display}</p> }
                </div>
            )}
        </Transition>
    )
}