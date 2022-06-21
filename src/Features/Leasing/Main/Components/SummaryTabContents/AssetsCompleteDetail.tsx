import * as React from 'react';

import KeyText from 'Shared/PageElements/KeyText';
import ValueText from 'Shared/PageElements/ValueText';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { Pencil } from 'Icons/Pencil';
import { IconColors } from 'Icons/IconColors';

import { AssetTypesDisplayNames } from 'API/Leasing/Types/Asset';
import styles from './summaryContent.module.css';
import { AuthenticatedLink } from 'Shared/Documents/AuthenticatedLink';

const AssetsCompleteDetail = ({ edit = false, nickname, type, value, accountType, joiner, uploads }) => {
    return (
        <>
            <FlexWrapper justify="between" align="start">
                <ValueText valueText={nickname} />
                {edit ? <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} /> : ''}
            </FlexWrapper>
            <div className={styles.flexWrapper}>
                <FlexWrapper justify="between" align="start" wrap>
                    <div className={styles.SubHeaderKeyValue}>
                        <KeyText keyText={AssetTypesDisplayNames[type]} />
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
                        {uploads.map((upload, i) => (
                            <div className={styles.uploadClick} key={`${upload.name}-${i}`}>
                                <AuthenticatedLink url={upload.url} filename={upload.name}>
                                    <ValueText valueText={upload.name} small style={{ wordWrap: 'break-word' }} />
                                </AuthenticatedLink>
                            </div>
                        ))}
                    </div>
                </FlexWrapper>
            </div>
        </>
    );
};

export default AssetsCompleteDetail;
