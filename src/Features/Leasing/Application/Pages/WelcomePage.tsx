import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'Shared/Button/Button';

import styles from './welcome-page.module.css';

interface Properties {
    next: string;
}

function WelcomePage({ next }: Properties): React.ReactElement {
    const history = useHistory();

    return (
        <main className={styles.WelcomePageStyles}>
            <section className={styles.WelcomeWrapper}>
                <h2 className={styles.WelcomeHeader}>Welcome!</h2>
                <p className={styles.WelcomeSubHeader}>We're glad you are here</p>
                <p className={styles.WelcomeParagraph}>
                    Here we will begin by walking you through step by step instructions to complete your prospective tenant
                    application. To get started, you will be asked to provide a photo ID, Social Security Number, and home
                    address. Once you are ready, please click the button below to Get Started!
                </p>
                <div className={styles.WelcomeButton}>
                    <Button text="Get Started" callback={() => history.push(next)} />
                </div>
            </section>
        </main>
    );
}

export default WelcomePage;

