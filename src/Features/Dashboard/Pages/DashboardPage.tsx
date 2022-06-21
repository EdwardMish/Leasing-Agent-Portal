import * as React from 'react';
import { Helmet } from 'react-helmet';

import ImportantTasks from '../../Tasks/ImportantTasks';

import DashboardLinks from '../DashboardLinks';
import MarketingLinks from '../MarketingLinks';

import styles from './dashboard-page.module.css';

const DashboardPage: React.FC = (): React.ReactElement => {
    return (
        <>
            <Helmet>
                <title>Dashcomm</title>
            </Helmet>
            <div className={styles.DashboardPage}>
                <ImportantTasks />
                <div className={styles.BannerImageWrapper}>
                    <picture>
                        <source
                            srcSet={`${ROOT}assets/dashcomm/dashboard-banner/dashboard-header-small.jpg`}
                            media="(max-width: 750px)"
                        />
                        <source
                            srcSet={`${ROOT}assets/dashcomm/dashboard-banner/dashboard-header-med.jpg`}
                            media="(max-width: 1150px)"
                        />
                        <img
                            src={`${ROOT}assets/dashcomm/dashboard-banner/dashboard-header.png`}
                            alt="DashComm Banner Image"
                            className={styles.BannerImage}
                        />
                    </picture>
                    <div className={styles.TopBlock}>
                        <h1>Welcome to DashComm</h1>
                        <h2>
                            Strong business. Strong community. Connecting you with the people, information and tools you need
                            – when you need them.
                        </h2>
                    </div>
                </div>
                <DashboardLinks />
                <MarketingLinks />
            </div>
        </>
    );
};

export default DashboardPage;
