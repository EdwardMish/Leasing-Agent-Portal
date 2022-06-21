import * as React from 'react';
import { useDispatch } from 'react-redux';
import { GlobalMessagesActions } from '../../State/GlobalMessages/actions';

import { GlobalMessage as GlobalMessageType, InterfaceMessageTypes } from '../../Types';

import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';
import { WarningMessage } from './WarningMessage';

const styles = require('./global-messages.module.css');

interface GlobalMessageProps {
    globalMessage: GlobalMessageType;
}

export const GlobalMessage: React.FC<GlobalMessageProps> = ({ globalMessage }) => {
    const dispatch = useDispatch();

    const dismiss = () => {
        dispatch({
            type: GlobalMessagesActions.REMOVE_MESSAGE,
            payload: globalMessage.id,
        });
    };

    React.useEffect(() => {
        const delayedRemove = setTimeout(() => { dismiss(); }, 5000);

        return () => {
            clearTimeout(delayedRemove);
        };
    }, []);

    const {
        id,
        message,
        messageType,
        secondaryMessage = '',
    } = globalMessage;

    const renderAction = () => {
        switch (messageType) {
        case InterfaceMessageTypes.ERROR:
            return (
                <ErrorMessage
                    key={id}
                    dismiss={dismiss}
                    primaryMessage={message}
                    secondaryMessage={secondaryMessage}
                />
            );
        case InterfaceMessageTypes.SUCCESS:
            return (
                <SuccessMessage
                    key={id}
                    dismiss={dismiss}
                    primaryMessage={message}
                    secondaryMessage={secondaryMessage}
                />
            );
        case InterfaceMessageTypes.WARNING:
            return (
                <WarningMessage
                    key={id}
                    dismiss={dismiss}
                    isDismissable
                    MessageBlock={() => (<p>{message}</p>)}
                />
            );
        }
    };

    return (
        <div className={styles.GlobalMessage}>{renderAction()}</div>
    );
};
