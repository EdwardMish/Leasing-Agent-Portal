import * as React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Button } from 'Shared/Button';
import { ButtonRow } from 'Shared/ButtonRow';
import { Close } from '../../Icons';

import styles = require('./modal.module.css');

interface ModalProps {
    actionCallback: () => void;
    actionText: string;
    cancelCallback: () => void;
    disable?: boolean;
    header?: string;
    hideHeader?: boolean;
    children: any;
}

function ModalWithAction({
    cancelCallback,
    actionCallback,
    actionText,
    disable,
    children,
    header = '',
    hideHeader = false,
}: ModalProps): JSX.Element {
    return (
        <div className={styles.Modal}>
            <OutsideClickHandler onOutsideClick={cancelCallback}>
                <div className={styles.ModalContent}>
                    {!hideHeader && (
                        <div className={styles.ModalHeader}>
                            <h2>{header}</h2>
                            {cancelCallback && (
                                <button
                                    type="button"
                                    onClick={cancelCallback}
                                    style={{ border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
                                >
                                    <div className={styles.ModalHeaderIcon}>
                                        <Close aspect="1.5rem" />
                                    </div>
                                </button>
                            )}
                        </div>
                    )}
                    {children}
                    <ButtonRow withMarginTop withMarginBottom>
                        <Button
                            text="Cancel"
                            inverse
                            callback={cancelCallback}
                            style={{ marginLeft: '.5rem', marginRight: '.25rem' }}
                        />
                        <Button
                            text={actionText}
                            callback={actionCallback}
                            style={{ marginRight: '.5rem', marginLeft: '.25rem' }}
                            disable={disable}
                        />
                    </ButtonRow>
                </div>
            </OutsideClickHandler>
        </div>
    );
}

export default ModalWithAction;
