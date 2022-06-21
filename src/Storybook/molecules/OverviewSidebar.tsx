import * as React from 'react';

import { FlexWrapper } from '../../Shared/FlexWrapper';
import KeyText from '../../Shared/PageElements/KeyText';
import AnchorLink from '../../Shared/PageElements/AnchorLink';
import ValueText from '../../Shared/PageElements/ValueText';
import { UserViewDetails, UserCreditReport } from '../dummyData/dummyData';

import styles from '../Pages/overview-styles.module.css';

const Sidebar = () => {
    return (
        <div>
            <FlexWrapper justify="between" align="start" wrap>
                <div className={styles.AccountOverviewRow}>
                    <KeyText keyText={UserCreditReport.label} />
                    <ValueText valueText={UserCreditReport.number} />
                </div>
                {UserViewDetails.map((detail) => (
                    <div className={styles.AccountOverviewRow}>
                        <AnchorLink AnchorLinkText={detail.label} />
                        <ValueText valueText={detail.number} />
                    </div>
                ))}
            </FlexWrapper>
        </div>
    );
};

export default Sidebar;

