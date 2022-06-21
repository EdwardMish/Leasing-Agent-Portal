import * as React from 'react';
import ModalWithAction from 'Shared/Modal/ModalWithAction';

interface Properties {
    handleConfirm: () => void;
    handleCancel: () => void;
}

export default ({ handleCancel, handleConfirm }: Properties): React.ReactElement => {
    return (
        <ModalWithAction
            header="Cancel Interaction?"
            actionText="Continue"
            actionCallback={handleConfirm}
            cancelCallback={handleCancel}
        >
            <div style={{ padding: '1rem' }}>
                <p>
                    You have note(s) and/or photo(s) which have <i>not</i> been saved.
                </p>
                <p>Are you sure you want to cancel this Interaction?</p>
            </div>
        </ModalWithAction>
    );
};

