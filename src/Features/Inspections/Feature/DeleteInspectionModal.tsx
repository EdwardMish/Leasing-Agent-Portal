import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import Inspections from '../../../API/Inspections';
import { globalMessageActionCreators } from '../../../State';
import { Actions, ActionTypes } from '../../../State/Inspections/Feature';

const modalParagraphStyles: React.CSSProperties = {
    margin: '0 0 1rem',
    lineHeight: '0.875rem',
};

const DeleteInspectionModal: React.FC<{
    showModal: boolean;
    closeCallback: () => void;
}> = ({ showModal, closeCallback }) => {
    const history = useHistory();

    let { inspectionId } = useParams<{ inspectionId: string }>();

    const dispatch = useDispatch();

    const [pendingDelete, togglePendingDelete] = React.useState<boolean>(false);

    const deleteDraft = async () => {
        togglePendingDelete(true);

        await Inspections.deleteInspection(inspectionId).catch(() => {
            dispatch(globalMessageActionCreators.addErrorMessage('We could not delete your draft.'));

            togglePendingDelete(false);

            closeCallback();

            return;
        });

        dispatch({
            type: Actions.DELETE_INSPECTION,
            payload: inspectionId,
        } as ActionTypes);

        history.push('/inspections/drafts');
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

