import * as React from 'react';
import ConfirmationModal from 'Shared/ConfirmationModal/ConfirmationModal';

import API from '../../../../API/Alerts';

import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

const ExpireAlert: React.FC<{ alertId: number; refreshCallback: () => void }> = ({
    alertId,
    refreshCallback,
}): React.ReactElement => {
    const [showModal, toggleShowModal] = React.useState<boolean>(false);

    const expireNow = async () => {
        await API.expireAlert(alertId);

        refreshCallback();

        toggleShowModal(false);
    };

    return (
        <>
            <FlexWrapper align="center" justify="between">
                <p style={{ marginRight: '1rem' }}>Expire the alert if the emergency warning is no longer required.</p>
                <Button text="Expire" callback={() => toggleShowModal(true)} />
            </FlexWrapper>
            {showModal && (
                <ConfirmationModal header="Confirm Expiration" onCancel={() => toggleShowModal(false)} onConfirm={expireNow}>
                    <p style={{ margin: '0 0 1rem' }}>Setting the expiration to now will remove the alerts for all users.</p>
                    <p style={{ margin: '0 0 1rem' }}>Would you like to expire this alert?</p>
                </ConfirmationModal>
            )}
        </>
    );
};

export default ExpireAlert;

