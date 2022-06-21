import * as React from 'react';

import { Close, Error } from '../../Icons';

const styles = require('./global-messages.module.css');

interface ErrorMessageProps {
    primaryMessage: string;
    secondaryMessage?: string;
    dismiss: (e: any) => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ dismiss, primaryMessage, secondaryMessage }) => (
    <div className={`${styles.MessagePanel} ${styles.ErrorMessage}`}>
        <Error />
        <div className={styles.MessagePanelInfo}>
            <p>{primaryMessage}</p>
            {!!secondaryMessage && <p>{secondaryMessage}</p>}
        </div>
        <div className={styles.MessagePanelClose} onClick={dismiss}>
            <Close aspect="1.25rem" />
        </div>
    </div>
);
