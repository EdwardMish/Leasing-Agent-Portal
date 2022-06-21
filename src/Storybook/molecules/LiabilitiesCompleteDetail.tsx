import * as React from 'react';

import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { Remove } from '../../Icons/Remove';
import { IconColors } from '../../Icons/IconColors';

import styles from '../Pages/guarantor-profile-overview.module.css';

const LiabilitiesCompleteDetail = ({ edit = false, nickname, type, otherName, value, accountType, joiner, uploads }) => {
    return (
        <>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText={nickname} />
                {edit ? <Remove aspect={'1.3rem'} color={IconColors.WarningRed} /> : ''}
            </FlexWrapper>

            <FlexWrapper justify="between" align="start" wrap>
                <div className={styles.SubHeaderKeyValue}>
                    {type == '' ? <KeyText keyText={otherName} /> : <KeyText keyText={type} />}

                    <ValueText valueText={value} small />
                </div>
                <div className={styles.SubHeaderKeyValue}>
                    <KeyText keyText={accountType} />
                    <ValueText valueText={joiner} small />
                </div>

                <div className={styles.SubHeaderKeyValue}>
                    <KeyText keyText={'Uploads'} />
                    {uploads?.map((upload) => (
                        <div className={styles.uploadClick}>
                            <ValueText valueText={upload} small />
                        </div>
                    ))}
                </div>
                <div className={styles.SubHeaderKeyValue}></div>
            </FlexWrapper>
        </>
    );
};

export default LiabilitiesCompleteDetail;
