import * as React from 'react';

import { Close, Warning } from '../../Icons';

const styles = require('./global-messages.module.css');

interface WarningMessageProps {
    MessageBlock: any;
    isDismissable: boolean;
    dismiss?: (e: any) => void;
}

export const WarningMessage: React.FC<WarningMessageProps> = ({
    MessageBlock,
    isDismissable = false,
    dismiss,
}) => (
    <div className={`${styles.MessagePanel} ${styles.WarningMessage}`}>
        <Warning />
        <div className={styles.MessagePanelInfo}>
            <MessageBlock />
        </div>
        {
            isDismissable
                && (
                    <div className={styles.MessagePanelClose} onClick={dismiss}>
                        <Close aspect="1.25rem" />
                    </div>
                )
        }
    </div>
);
