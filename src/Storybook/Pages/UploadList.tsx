import React from 'react';

import Title from '../../Shared/PageElements/Title';
import Divider from '../../Shared/PageElements/Divider';
import NavigationButtons from '../molecules/NavigationButtons';
import { BackButton } from '../molecules/NavigationButtons';
import { IconWithText } from '../../Shared/PageElements';
import { Add } from '../../Icons/Add';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import AssetLiabilitiesOtherOverview from '../molecules/AssetLiabilitiesOtherOverview';
import QuestionDetail from '../molecules/QuestionDetail';

import styles from './assets-liabilities.module.css';

interface AssetListProps {
    title: string;
    buttonTitle: string;
    value: string;
    submit?: boolean;
}

const AssetUploadList: React.FC<AssetListProps> = ({ title, buttonTitle, value, submit = false }) => {
    return (
        <div className={styles.PageWrapper}>
            <div className={styles.AssetsHeader}>
                <FlexWrapper justify="between" align="start">
                    <Title title={`${title} Overview`} />
                    <div className={styles.UploadTotalWrapper}>
                        <KeyText keyText={`Total ${title}`} />
                        <ValueText valueText={value} />
                    </div>
                </FlexWrapper>
            </div>

            <Divider />
            {title == 'Assets' ? (
                <AssetLiabilitiesOtherOverview edit asset />
            ) : title == 'Documents' ? (
                <AssetLiabilitiesOtherOverview edit other />
            ) : title == 'Questions' ? (
                <QuestionDetail />
            ) : (
                <AssetLiabilitiesOtherOverview edit />
            )}
            {title == 'Questions' ? '' : 
            <IconWithText text={buttonTitle} Icon={Add} iconAspect={'2rem'} iconOnLeft />}
            {submit ? <NavigationButtons leftTitle="back" rightTitle={`Complete ${title}`} /> : <BackButton title="back" />}
        </div>
    );
};

export default AssetUploadList;

