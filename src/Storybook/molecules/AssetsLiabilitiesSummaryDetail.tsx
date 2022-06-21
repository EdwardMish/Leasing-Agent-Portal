import * as React from 'react';

import { ChevronRight, IconColors } from '../../Icons';
import { IconWithText } from '../../Shared/PageElements';
import ValueText from '../../Shared/PageElements/ValueText';
import { FlexWrapper } from '../../Shared/FlexWrapper';

import styles from '../Pages/guarantor-profile-activity.module.css';

const AssetsLiabilitiesSummaryDetail = ({ buttonText, headerText, subHeader = false, subHeaderText }) => {
    return (
        <div className={styles.OverviewBorder}>
            <FlexWrapper justify="between" align="center">
                {subHeader ? (
                    <div>
                        <ValueText valueText={headerText} />
                        <p className={styles.ListSubHeader}>{subHeaderText}</p>
                    </div>
                ) : (
                    <ValueText valueText={headerText} />
                )}
                <div className={styles.DesktopIcon}>
                    <IconWithText text={buttonText} Icon={ChevronRight} iconAspect={'2rem'} />
                </div>
                <div className={styles.MobileIcon}>
                    <ChevronRight color={IconColors.BrandBlue} />
                </div>
            </FlexWrapper>
        </div>
    );
};

export default AssetsLiabilitiesSummaryDetail;

