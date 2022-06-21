import * as React from 'react';

import styles from '../Pages/prospective-tenant.module.css';
interface NavButtonProps {
    leftTitle: string;
    rightTitle: string;
}

const NavigationButtons: React.FC<NavButtonProps> = ({ leftTitle, rightTitle }) => {
    return (
        <div className={styles.ButtonWrapper}>
            <div className={styles.InviteButton}>
                {/* Use this type of button not my mock buttons that are easier for storybook */}

                {/* <FormButtons.Submit text={leftTitle} inverse type={'submit'} disable={isSubmitting} /> */}

                <button className={`${styles.MockButton} ${styles.Left}`}>{leftTitle}</button>
            </div>
            <div className={styles.InviteButton}>
                <button className={styles.MockButton}>{rightTitle}</button>
            </div>
        </div>
    );
};

export const BackButton = ({ title, full = false }) => {
    return (
        <div className={styles.ButtonWrapper}>
            <div className={styles.InviteButton}>
                <button className={full ? `${styles.MockButton} ${styles.Left} ${styles.FullButton}` : `${styles.MockButton} ${styles.Left}`}>{title}</button>
            </div>
        </div>
    );
};

export const ForwardButton = ({ title, full=false }) => {
    return (
        <div className={styles.ButtonWrapper}>
            <div className={styles.InviteButton}>
                <button className={full ? `${styles.FullButton} ${styles.MockButton}` : styles.MockButton}>{title}</button>
            </div>
        </div>
    );
};

export const MockButton = ({ title, inverse = false, full = false }) => {
    return <button className={`${inverse ? `${styles.MockButton} ${styles.Left}` :   styles.MockButton} ${full ? styles.FullButton : ''}`} >{title}</button>;
};

export default NavigationButtons;
