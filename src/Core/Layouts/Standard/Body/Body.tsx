import * as React from 'react';
import { useSelector } from 'react-redux';

import { emergencyNewsItemSelectors } from '../../../../State';

import EmergencyAlertDisplay from '../../../../Features/EmergencyAlerts/EmergencyAlertDisplay';

import { Navigation } from '../../../Navigation';
import { StackedLogoWrapper } from '../../../PECOLogo';

const styles = require('./body.module.css');

interface BodyProps {
    navIsOpen: boolean;
}

export const Body: React.FC<BodyProps> = ({ navIsOpen, children }) => {
    const hasEmergencyNewsItems: boolean = useSelector(emergencyNewsItemSelectors.hasEmergencyNewsItems);

    return (
        <>
            <div className={`${styles.NavWrapper} ${navIsOpen ? styles.OpenNav : styles.CloseNav}`} id="navigationPanel">
                <Navigation />
                <StackedLogoWrapper />
            </div>
            <div className={styles.CoreBody}>
                <div
                    className={styles.CoreContent}
                    style={{
                        paddingTop: hasEmergencyNewsItems ? '6.75rem' : '5rem',
                    }}
                >
                    <EmergencyAlertDisplay />
                    {children}
                </div>
            </div>
        </>
    );
};

