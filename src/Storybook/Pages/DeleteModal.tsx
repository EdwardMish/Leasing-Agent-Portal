import React from 'react';
import { MockButton } from '../molecules/NavigationButtons';
import ValueText from '../../Shared/PageElements/ValueText';
import { Close } from '../../Icons';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { IconColors } from '../../Icons';

import styles from './delete-modal.module.css';

interface DeleteModalProps {}

const DeleteModal: React.FC<DeleteModalProps> = () => {
    return (
        <div className={styles.ModalWrapper}>
            <div className={styles.ModalHeader}>
                <FlexWrapper justify="between" align="center">
                    <ValueText valueText="Cancel Application?" />
                    <Close color={IconColors.BrandBlue} />
                </FlexWrapper>
            </div>
            <div className={styles.ModalBody}>
                <ValueText valueText="All Guarantor information will be deleted." small color={IconColors.WarningRed} />
                <ValueText valueText="This CAN NOT be undone. Are you sure?" small />
            </div>
            <div className={styles.ButtonWrapper}>
                <FlexWrapper justify="around" align="center">
                    <div className={styles.ButtonWrapperLeft}>
                        <MockButton title="Cancel" inverse full />
                    </div>
                    <div className={styles.ButtonWrapperRight}>
                        <MockButton title="Confirm" full />
                    </div>
                </FlexWrapper>
            </div>
        </div>
    );
};

export default DeleteModal;

