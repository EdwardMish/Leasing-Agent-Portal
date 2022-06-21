import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import Inspections from '../../../../API/Inspections';
import { globalMessageActionCreators } from '../../../../State';
import { Actions, ActionTypes } from '../../../../State/Inspections/App';
import { ActiveInspection } from '../../../../State/Inspections/App/Types/ActiveInspection';

const modalParagraphStyles: React.CSSProperties = {
    margin: '0 0 1rem',
    lineHeight: '0.875rem',
};

const DeleteInspectionModal: React.FC<{
    activeInspection: ActiveInspection;
    showModal: boolean;
    propertyId: string;
    closeCallback: () => void;
}> = ({ activeInspection, showModal, propertyId, closeCallback }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [pendingDelete, togglePendingDelete] = React.useState<boolean>(false);

    const deleteDraft = async () => {
        togglePendingDelete(true);

        await Inspections.deleteInspection(activeInspection.id).catch(() => {
            dispatch(globalMessageActionCreators.addErrorMessage('We could not delete your draft.'));

            togglePendingDelete(false);

            closeCallback();

            return;
        });

        dispatch({
            type: Actions.RESET_ACTIVE_INSPECTION,
        } as ActionTypes);

        dispatch({
            type: Actions.REMOVE_DRAFT_FROM_PROPERTY,
            payload: propertyId,
        } as ActionTypes);

        history.push('/app/inspections');
    };

    return (
        <>
            {showModal ? (
                <ModalWithAction
                    header="Delete Draft"
                    actionText="Confirm"
                    disable={pendingDelete}
                    actionCallback={deleteDraft}
                    cancelCallback={closeCallback}
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
            ) : null}
        </>
    );
};

export default DeleteInspectionModal;

