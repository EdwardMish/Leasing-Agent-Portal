import * as React from 'react';

import { Close, Success } from '../../Icons';

const styles = require('./global-messages.module.css');

interface SuccessMessageProps{
    primaryMessage: string;
    secondaryMessage?: string;
    dismiss: (e: any) => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ dismiss, primaryMessage, secondaryMessage }) => (
    <div className={`${styles.MessagePanel} ${styles.SuccessMessage}`}>
        <Success />
        <div className={styles.MessagePanelInfo}>
            <p>{primaryMessage}</p>
            {!!secondaryMessage && <p>{secondaryMessage}</p>}
        </div>
        <div className={styles.MessagePanelClose} onClick={dismiss}>
            <Close aspect="1.25rem" />
        </div>
    </div>
);
