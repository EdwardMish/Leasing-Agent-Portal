import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Welcome } from '../../../../State';

import { Button } from '../../../../Shared/Button';

import WelcomeIntroSnippet from '../../../../Data/Snippets/WelcomeIntroSnippet';
import WelcomeButtonLink from '../WelcomeButtonLink';

import styles = require('../welcome.module.css');

interface Properties {
    nextRoute: string;
}

const WelcomePage: React.FC<Properties> = ({ nextRoute }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { occupantsRequiringSetup } = Welcome.Hooks.useOccupantsFromWelcomeState();

    const skipAndNavigateTo = (path: string) => {
        occupantsRequiringSetup.forEach((o) => {
            dispatch({
                type: Welcome.Actions.SET_OCCUPANT_SETUP_COMPLETE,
                payload: o.id,
            });
        });

        history.push(path);
    };

    return occupantsRequiringSetup.length > 0 ? (
        <>
            <h1>Welcome!</h1>
            <div className={styles.WelcomeParagraphBlock}>
                <WelcomeIntroSnippet />
            </div>
            <div>
                <ul>
                    {occupantsRequiringSetup.map((_) => (
                        <li key={`business-${_.id}`}>{_.name}</li>
                    ))}
                </ul>
                <p>
                    If you are here to submit a payment, click{' '}
                    <span className={styles.Link} onClick={() => skipAndNavigateTo('/invoices')}>
                        here
                    </span>{' '}
                    to go to the Invoices section of DashComm.
                </p>
            </div>
            <WelcomeButtonLink display='Get Started' link={nextRoute} />
            <Button
                text='Skip For Now'
                callback={() => {
                    skipAndNavigateTo('/');
                }}
                fullWidth
                withMarginTop
                inverse
            />
        </>
    ) : (
        <>
            <h1>Great Job!</h1>
            <p className={styles.WelcomeParagraphBlock}>You did it! Way to go!</p>
            <WelcomeButtonLink display='Proceed to DashComm' link='/' />
        </>
    );
};

export default WelcomePage;
