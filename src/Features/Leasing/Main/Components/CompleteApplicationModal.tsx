import { Close, IconColors } from 'Icons';
import React from 'react';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import ValueText from 'Shared/PageElements/ValueText';
import styles from './cancel-modal.module.css';

interface Properties {
    onClose: () => void;
    onOk: () => void;
}

const CompleteApplicationModal = ({ onOk, onClose }: Properties) => {
    return (
        <div className={styles.ModalWrapper}>
            <div className={styles.ModalHeader}>
                <FlexWrapper justify="between" align="center">
                    <ValueText valueText="Complete Application?" />
                    <div style={{ cursor: 'pointer' }} onClick={onClose}>
                        <Close color={IconColors.BrandBlue} />
                    </div>
                </FlexWrapper>
            </div>
            <div className={styles.ModalBody}>
                <p>Completing this application will prevent any further updates to the application.</p>
                <p>Continue?</p>
            </div>
            <div className={styles.ButtonWrapper}>
                <FlexWrapper justify="around" align="center">
                    <div className={styles.ButtonWrapperLeft}>
                        <Button text="Cancel" inverse fullWidth callback={onClose} />
                    </div>
                    <div className={styles.ButtonWrapperRight}>
                        <Button text="Confirm" fullWidth callback={onOk} />
                    </div>
                </FlexWrapper>
            </div>
        </div>
    );
};

export default CompleteApplicationModal;
