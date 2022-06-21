import * as React from 'react';

import KeyText from 'Shared/PageElements/KeyText';
import ValueText from 'Shared/PageElements/ValueText';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { Pencil } from 'Icons/Pencil';
import { IconColors } from 'Icons/IconColors';

import styles from './summaryContent.module.css';
import { liabilityTypesDisplayNames } from 'API/Leasing/Types/Liability';
import { AuthenticatedLink } from 'Shared/Documents/AuthenticatedLink';

const LiabilitiesCompleteDetail = ({ edit = false, nickname, type, otherName, value, accountType, joiner, uploads }) => {
    return (
        <>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText={nickname} />
                {edit ? <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} /> : ''}
            </FlexWrapper>

            <FlexWrapper justify="between" align="start" wrap>
                <div className={styles.SubHeaderKeyValue}>
                    {type == '' ? <KeyText keyText={otherName} /> : <KeyText keyText={liabilityTypesDisplayNames[type]} />}

                    <ValueText valueText={value} small />
                </div>
                <div className={styles.SubHeaderKeyValue}>
                    {joiner ? (
                        <>
                            <KeyText keyText={accountType} />
                            <ValueText valueText={joiner} small />
                        </>
                    ) : (
                        <KeyText keyText={accountType} colon={false} />
                    )}
                </div>

                <div className={styles.SubHeaderKeyValue}>
                    <KeyText keyText={'Uploads'} />
                    {uploads?.map((upload, i) => (
                        <div className={styles.uploadClick} key={`${upload.name}-${i}`}>
                            <AuthenticatedLink url={upload.url} filename={upload.name}>
                                <ValueText valueText={upload.name} small style={{ wordWrap: 'break-word' }} />
                            </AuthenticatedLink>
                        </div>
                    ))}
                </div>
            </FlexWrapper>
        </>
    );
};

export default LiabilitiesCompleteDetail;
