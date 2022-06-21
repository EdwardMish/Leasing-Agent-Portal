import * as React from 'react';
import ModalWithAction from 'Shared/Modal/ModalWithAction';

import styles = require('./confirmation-modal.module.css');

interface ConfirmationModalProps {
    header: string;
    onCancel: () => void;
    onConfirm: () => void;
    disableButton?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    header,
    children,
    onCancel,
    onConfirm,
    disableButton = false,
}) => (
    <ModalWithAction
        header={header}
        actionText="Confirm"
        disable={disableButton}
        actionCallback={onConfirm}
        cancelCallback={onCancel}
    >
        <div className={styles.ConfirmationModalContent}>{children}</div>
    </ModalWithAction>
);

export default ConfirmationModal;
