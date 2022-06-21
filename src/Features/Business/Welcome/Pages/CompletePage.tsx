import { OccupantAPI } from 'API/Occupant';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import WelcomeCompleteSnippet from '../../../../Data/Snippets/WelcomeCompleteSnippet';
import { Button } from '../../../../Shared/Button';
import { Welcome } from '../../../../State';

import styles = require('../welcome.module.css');

export const CompletePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const firstOccupantToSetup: Welcome.Types.Occupant | undefined = useSelector(Welcome.selectors.occupantToSetup);

    const [showConformation, toggleShowConfirmation] = React.useState<boolean>(false);

    const markComplete = () => {
        if (firstOccupantToSetup) {
            OccupantAPI.updateSetupCompletion(firstOccupantToSetup.id).then(() => {
                continueToEnd();
            });
        }
    };

    const continueToEnd = () => {
        if (firstOccupantToSetup) {
            dispatch({
                type: Welcome.Actions.SET_OCCUPANT_SETUP_COMPLETE,
                payload: firstOccupantToSetup.id,
            });

            history.push('/app/welcome');
        }
    };

    return (
        <>
            <h1>Setup Complete</h1>
            <p className={styles.WelcomeParagraphBlock}>
                <WelcomeCompleteSnippet />
            </p>
            <Button callback={() => toggleShowConfirmation(true)} text="Complete Setup" fullWidth />
            <Button callback={continueToEnd} text="Continue" fullWidth withMarginTop inverse />
            {showConformation && (
                <ModalWithAction
                    header="Complete Setup"
                    actionText="Confirm"
                    actionCallback={markComplete}
                    cancelCallback={() => toggleShowConfirmation(false)}
                >
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem' }}>Ready To Complete Setup?</h3>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>
                            {`By confirming, you will no longer be prompted with the setup for ${
                                firstOccupantToSetup?.name || ''
                            }.`}
                        </p>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>
                            Please visit the Business page, located in the left hand menu, to update your Business
                            Information, Users, or Compliance.
                        </p>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>
                            <b>Would you like to continue?</b>
                        </p>
                    </div>
                </ModalWithAction>
            )}
        </>
    );
};

