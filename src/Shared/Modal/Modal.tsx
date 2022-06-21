import * as React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Close } from '../../Icons';

import styles from './modal.module.css';

interface ModalProps {
    callBack?: () => void;
    header?: string;
    hideHeader?: boolean;
    style?: Record<string, string>;
}

const Modal: React.FC<ModalProps> = ({ callBack, children, header = '', hideHeader = false, style = {} }) => (
    <div className={styles.Modal}>
        <OutsideClickHandler
            onOutsideClick={() => {
                if (callBack) {
                    callBack();
                }
            }}
        >
            <div className={styles.ModalContent} style={style}>
                {!hideHeader && (
                    <div className={styles.ModalHeader}>
                        <h2>{header}</h2>
                        {callBack && (
                            <button type="button" onClick={callBack}>
                                <div className={styles.ModalHeaderIcon}>
                                    <Close aspect="1.5rem" />
                                </div>
                            </button>
                        )}
                    </div>
                )}
                {children}
            </div>
        </OutsideClickHandler>
    </div>
);

export default Modal;
