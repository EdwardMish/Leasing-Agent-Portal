import * as React from 'react';

import Title from '../../Shared/PageElements/Title';
import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import { FlexWrapper } from '../../Shared/FlexWrapper';

import styles from '../Pages/assets-liabilities.module.css';

const AssetsLiabilitiesHeader = ({ headerName, amount, amountSubheader }) => {
    return (
        <div className={styles.AssetsHeader}>
            <FlexWrapper justify="between" align="start">
                <Title title={headerName} />
                <div className={styles.AmountBox}>
                    <KeyText keyText={amountSubheader} />
                    <ValueText valueText={amount} />
                </div>
            </FlexWrapper>
        </div>
    );
};

export default AssetsLiabilitiesHeader;
