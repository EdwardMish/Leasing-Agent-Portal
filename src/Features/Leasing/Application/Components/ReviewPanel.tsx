import { Add, IconColors, Pencil, Remove } from 'Icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FlexWrapper } from 'Shared/FlexWrapper';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { ValueText } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import styles from './reviewPanel.module.css';

interface ReviewPanelProps {
    title?: string;
    children?: any;
    options?: Record<string, any>;
}

const ReviewPanel = ({ title, children, options }: ReviewPanelProps): React.ReactElement => {
    const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
    const dispatch = useDispatch();

    const closeDeleteModal = () => {
        toggleDeleteModal(false);
    };

    const openDeleteModal = () => {
        toggleDeleteModal(true);
    };

    const onDeleteHandler = () => {
        if (options?.delete?.modal?.onDeleteHandler) {
            const successMessage = options?.delete?.modal?.successMessage ?? 'The record was successfully deleted';
            const errorMessage =
                options?.delete?.modal?.errorMessage ?? 'Sorry, we were unable to delete the record, please try again';
            try {
                options.delete.modal.onDeleteHandler();
                dispatch(globalMessageActionCreators.addSuccessMessage(successMessage));
                closeDeleteModal();
            } catch (err) {
                dispatch(globalMessageActionCreators.addErrorMessage(errorMessage, err));
            }
        }
    };

    return (
        <>
            {options?.delete?.modal && isDeleteModalOpen && (
                <ModalWithAction
                    header={options?.delete?.modal?.title}
                    actionText="Confirm"
                    actionCallback={onDeleteHandler}
                    cancelCallback={closeDeleteModal}
                >
                    <div style={{ padding: '1rem' }}>
                        <p>{options?.delete?.modal?.content}</p>
                    </div>
                </ModalWithAction>
            )}
            <div className={styles.TasksListItem}>
                <FlexWrapper column align="center" justify="between">
                    <FlexWrapper align="center" justify="between" fullWidth>
                        <ValueText valueText={title || ''} />
                        <div className={styles.IconWrapper}>
                            {options?.add?.link && (
                                <Link
                                    to={{ pathname: options?.add?.link, state: options?.add?.state }}
                                    className={styles.iconButton}
                                >
                                    <Add aspect="1.5rem" color={IconColors.BrandBlue} />
                                </Link>
                            )}
                            {options?.edit?.link && (
                                <Link
                                    to={{ pathname: options?.edit?.link, state: options?.edit?.state }}
                                    className={styles.iconButton}
                                >
                                    <Pencil aspect="1.5rem" color={IconColors.BrandBlue} />
                                </Link>
                            )}

                            {options?.delete?.link && (
                                <Link
                                    to={{ pathname: options?.delete?.link, state: options?.delete?.state }}
                                    className={styles.iconButton}
                                >
                                    <Remove aspect="1.5rem" color={IconColors.WarningRed} />
                                </Link>
                            )}
                            {options?.delete?.modal && (
                                <div onClick={openDeleteModal} className={styles.iconButton}>
                                    <Remove aspect="1.5rem" color={IconColors.WarningRed} />
                                </div>
                            )}
                        </div>
                    </FlexWrapper>
                </FlexWrapper>

                <FlexWrapper align="start" justify="start">
                    {children}
                </FlexWrapper>
            </div>
        </>
    );
};

export default ReviewPanel;
