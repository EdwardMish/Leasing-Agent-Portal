import * as React from 'react';

import { Button } from '../../../Shared/Button';

const styles = require('./confirmation-panel.module.css');

interface ConfirmationPanelProps {
    confirm: () => void;
    cancel: () => void;
}

export const ConfirmationPanel: React.FC<ConfirmationPanelProps> = ({ children, confirm, cancel }) => {
    const confirmationHandler = () => {
        confirm();
    };

    const cancellationHandler = () => {
        cancel();
    };

    return (
        <div className={styles.ConfirmationPanel}>
            {children}
            <Button callback={confirmationHandler} text="Confirm" fullWidth withMarginBottom />
            <Button callback={cancellationHandler} text="Cancel" fullWidth inverse />
        </div>
    );
};
