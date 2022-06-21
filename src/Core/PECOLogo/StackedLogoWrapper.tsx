import * as React from 'react';
import { Social } from '../../Icons';

import { PECOLogoStacked } from './PECOLogoStacked';

import styles from './peco-logo.module.css';

export const StackedLogoWrapper: React.FC<{}> = () => (
    <div className={styles.LogoWrapper}>
        <a href="https://www.phillipsedison.com/">
            <PECOLogoStacked />
        </a>
        <div className={styles.SocialIconsWrapper}>
            <a className={styles.IconFill} href="https://www.facebook.com/phillipsedison.co">
                <Social.Facebook />
            </a>
            <a className={styles.IconFill} href="https://twitter.com/PhillipsEdison">
                <Social.Twitter />
            </a>
            <a
                className={styles.IconFill}
                href="https://www.linkedin.com/company/47287?trk=tyah&trkInfo=tas%3Aphillips%20edison%2Cidx%3A1-1-1"
            >
                <Social.LinkedIn />
            </a>
            <a className={styles.IconStroke} href="https://www.instagram.com/phillips.edison/">
                <Social.Instagram />
            </a>
        </div>
    </div>
);
