import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import Inspections, { Types } from '../../../API/Inspections';
import { IconColors, Warning } from '../../../Icons';
import { Button } from '../../../Shared/Button';
import { ButtonRow } from '../../../Shared/ButtonRow';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { globalMessageActionCreators, InspectionsApp } from '../../../State';

import styles = require('./inspections.module.css');

const paragraphStyles: React.CSSProperties = {
    margin: '0 0 0.875rem',
    lineHeight: '1.4rem',
};
const modalParagraphStyles: React.CSSProperties = {
    margin: '0 0 1rem',
    lineHeight: '0.875rem',
};

interface UseOrDeleteDraftProps {
    draft: Types.Inspection | null;
    propertyId: number | string;
    useDraft: () => void;
    clearDraft: () => void;
}

export default ({ draft, propertyId, useDraft, clearDraft }: UseOrDeleteDraftProps): React.ReactElement => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [showDeleteModal, toggleDeleteModal] = React.useState<boolean>(false);
    const [showErrorModal, toggleErrorModal] = React.useState<boolean>(false);
    const [pendingDelete, togglePendingDelete] = React.useState<boolean>(false);

    const handleDeleteDraft = async () => {
        if (draft) {
            togglePendingDelete(true);

            await Inspections.deleteInspection(draft.id).catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We were not able to delete your draft.'));

                toggleDeleteModal(false);

                toggleErrorModal(true);

                togglePendingDelete(false);

                throw new Error('Unable to delete draft');
            });

            dispatch({
                type: InspectionsApp.Actions.RESET_ACTIVE_INSPECTION,
            } as InspectionsApp.ActionTypes);

            dispatch({
                type: InspectionsApp.Actions.REMOVE_DRAFT_FROM_PROPERTY,
                payload: propertyId,
            } as InspectionsApp.ActionTypes);

            dispatch(globalMessageActionCreators.addSuccessMessage('Your previous draft has been deleted.'));

            clearDraft();
        }
    };

    const returnToList = () => {
        history.push('/app/inspections');
    };

    return (
        <>
            {draft && (
                <div className={styles.InspectionsWrapper}>
                    <h1>Draft Found</h1>
                    <p style={paragraphStyles}>You had previously started an inspection for this property.</p>
                    <p style={paragraphStyles}>
                        To continue, you can delete your existing draft and begin a new inspection report, or pick up where
                        you left off.
                    </p>
                    <p style={paragraphStyles}>
                        <b>{`This draft was started on ${new Date(draft.createdDate).toDateString()}`}</b>
                    </p>
                    <ButtonRow withMarginTop>
                        <Button callback={() => toggleDeleteModal(true)} text="Delete" inverse />
                        <Button callback={useDraft} text="Continue" />
                    </ButtonRow>
                </div>
            )}
            {showDeleteModal && (
                <ModalWithAction
                    header="Delete Draft"
                    actionText="Confirm"
                    disable={pendingDelete}
                    actionCallback={handleDeleteDraft}
                    cancelCallback={() => toggleDeleteModal(false)}
                >
                    <div style={{ padding: '1rem' }}>
                        <p style={modalParagraphStyles}>
                            <b>You cannot recover a deleted draft.</b>
                        </p>
                        <p style={modalParagraphStyles}>All draft items will be lost upon deletion.</p>
                        <p style={modalParagraphStyles}>
                            <b>Are you sure?</b>
                        </p>
                    </div>
                </ModalWithAction>
            )}
            {showErrorModal && (
                <Modal header="Unable to Delete Draft" callBack={() => toggleErrorModal(false)}>
                    <div style={{ padding: '1rem' }}>
                        <FlexWrapper align="center" justify="start" style={{ margin: '0 0 1rem' }}>
                            <Warning aspect="1.25rem" color={IconColors.WarningRed} />
                            <p
                                style={{
                                    ...modalParagraphStyles,
                                    margin: '0 0 0 0.25rem',
                                    color: IconColors.WarningRed,
                                    fontWeight: 700,
                                }}
                            >
                                <b>We were not able to delete the draft</b>
                            </p>
                        </FlexWrapper>
                        <p style={modalParagraphStyles}>Would you like to try again, or return to the property list?</p>
                        <ButtonRow withMarginTop>
                            <Button text="Return to List" inverse callback={returnToList} disable={pendingDelete} />
                            <Button text="Retry" callback={handleDeleteDraft} disable={pendingDelete} />
                        </ButtonRow>
                    </div>
                </Modal>
            )}
        </>
    );
};

