import * as React from 'react';

import LiabilitiesCompleteDetail from './LiabilitiesCompleteDetail';
import AssetsCompleteDetail from './AssetsCompleteDetail';
import AssetsLiabilitiesSummaryDetail from './AssetsLiabilitiesSummaryDetail';
import DocumentDetail from './DocumentDetail';
import { liabilitiesList, documentList, assetList } from '../dummyData/dummyData';

import styles from '../Pages/guarantor-profile-activity.module.css';

interface AssetLiabilitiesOtherOverviewProps {
    summary?: boolean;
    style?: React.CSSProperties;
    buttonText?: string;
    headerText?: string;
    edit?: boolean;
    asset?: boolean;
    other?: boolean;
    subHeader?: boolean;
    subHeaderText?: string;
}

const AssetLiabilitiesOtherOverview: React.FC<AssetLiabilitiesOtherOverviewProps> = ({
    summary,
    buttonText,
    headerText,
    edit,
    asset,
    other,
    subHeader,
    subHeaderText,
}) => {
    return (
        <div>
            {summary ? (
                <div>
                    <AssetsLiabilitiesSummaryDetail
                        buttonText={buttonText}
                        headerText={headerText}
                        subHeader={subHeader}
                        subHeaderText={subHeaderText}
                    />
                </div>
            ) : (
                <>
                    {other ? (
                        <>
                            {documentList.map((document) => (
                                <div className={styles.OverviewBorder}>
                                    <DocumentDetail title={document.title} uploads={document.uploads} edit={edit} />
                                </div>
                            ))}
                            
                        </>
                    ) : asset ? (
                        <>
                            {assetList.map((Asset) => (
                                <div className={styles.OverviewBorder}>
                                    <AssetsCompleteDetail
                                        edit={edit}
                                        nickname={Asset.nickname}
                                        type={Asset.type}
                                        value={Asset.value}
                                        accountType={Asset.accountType}
                                        joiner={Asset.joiner}
                                        uploads={Asset.uploads}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {liabilitiesList.map((liability) => (
                                <div className={styles.OverviewBorder}>
                                    <LiabilitiesCompleteDetail
                                        edit={edit}
                                        nickname={liability.nickname}
                                        type={liability.type}
                                        otherName={liability.otherName}
                                        value={liability.value}
                                        accountType={liability.accountType}
                                        joiner={liability.joiner}
                                        uploads={liability.uploads}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AssetLiabilitiesOtherOverview;

