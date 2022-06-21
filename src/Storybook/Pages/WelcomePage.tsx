import * as React from 'react';

import styles from './prospective-tenant.module.css';

interface WelcomePageProps {}

const WelcomePage: React.FC<WelcomePageProps> = () => {
    return (
        <>
            <div className={styles.PageWrapper}>
                <main className={styles.WelcomePageStyles}>
                    <section className={styles.WelcomeWrapper}>
                        <h2 className={styles.WelcomeHeader}>Welcome!</h2>
                        <p className={styles.WelcomeSubHeader}>We're glad you are here</p>
                        <p className={styles.WelcomeParagraph}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className={styles.WelcomeButton}>
                            {/* use the actual button component imported above and its own styles, not my mocked button */}
                            {/* <Button text="get started" /> */}
                            <button className={styles.MockButton}>get started</button>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default WelcomePage;

