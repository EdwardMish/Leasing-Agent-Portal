import * as React from 'react';
import { useState } from 'react';

import ProfileSnapshot from '../molecules/GuarantorProfileSnapshot';
import { Add, SecondaryMenu } from '../../Icons';
import { Remove } from '../../Icons/Remove';
import { IconWithText } from '../../Shared/PageElements';
import Tabs from '../molecules/Tabs';
import MobileTabHeader from '../molecules/MobileTabHeader';
import Divider from '../../Shared/PageElements/Divider';
import AssetLiabilitiesOtherOverview from '../molecules/AssetLiabilitiesOtherOverview';
import AssetLiabilityActivityBar from './AssetLiabilityActivityBar';
import Messaging from './Messaging';
import { liabilityMessageList, questionList, documentList } from '../dummyData/dummyData';

import { IconColors } from '../../Icons/IconColors';
import generalStyles from './prospective-tenant.module.css';
import styles from './guarantor-profile-activity.module.css';
import { FlexWrapper } from '../../Shared/FlexWrapper';

const GuarantorProfileActivity = ({ style, isSubmitting }) => {
    const [tab, setTab] = useState('tab1');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
        if (target.value == 'tab3') setTab('tab3');
    };

    const handleChat = () => {
        setTab('tab3');
    };

    const handleMenuOpen = () => setMenuOpen(!menuOpen);

    const assetSummaryLinkText = 'View Asset Details';
    const liabilitySummaryLinkText = 'View Liability Details';
    const guarantor = 'Fred Tenant';

    return (
        <div className={generalStyles.PageWrapper}>
            <main className={generalStyles.PageStyles}>
                <ProfileSnapshot
                    guarantor={guarantor}
                    leadName={'Lead #1234'}
                    backColor={IconColors.BrandBlue}
                    buttonText={'View Profile Summary'}
                />
                <div className={generalStyles.DesktopTabHeader}>
                    <div className={styles.HeaderWrapper} style={{ marginTop: '2rem' }}>
                        <Tabs
                            tab={tab}
                            handleTab={handleTab}
                            tabName1={'Remaining Tasks'}
                            tabName2={'Completed'}
                            tabName3={'Messaging'}
                        />
                        <div className={styles.SecondaryMenu} onClick={handleMenuOpen}>
                            <SecondaryMenu color={IconColors.BrandBlue} />
                            {menuOpen ? (
                                <div className={styles.PopUpWindow}>
                                    <FlexWrapper justify="end" align="end" column>
                                        <div className={styles.IconSpacing}>
                                            <IconWithText text="Add Custom Task" Icon={Add} iconAspect={'1.2rem'} />
                                        </div>
                                        <div className={styles.IconSpacing}>
                                            <IconWithText
                                                text="Cancel Application"
                                                Icon={Remove}
                                                iconAspect={'1.2rem'}
                                                color={IconColors.WarningRed}
                                            />
                                        </div>
                                    </FlexWrapper>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className={generalStyles.MobileTabHeader}>
                    <MobileTabHeader
                        title={'tabs'}
                        handleTab={handleTab}
                        handleMenuOpen={handleMenuOpen}
                        tab1={'Remaining Tasks'}
                        tab2={'Completed'}
                        tab3={'Messaging'}
                        addOption
                    />
                    {menuOpen ? (
                        <div className={styles.PopUpWindow}>
                            <FlexWrapper justify="end" align="end" column>
                                <div className={styles.IconSpacing}>
                                    <IconWithText text="Add Custom Task" Icon={Add} iconAspect={'1.2rem'} />
                                </div>
                                <div className={styles.IconSpacing}>
                                    <IconWithText
                                        text="Cancel Application"
                                        Icon={Remove}
                                        iconAspect={'1.2rem'}
                                        color={IconColors.WarningRed}
                                    />
                                </div>
                            </FlexWrapper>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <Divider />
                {tab == 'tab1' ? (
                    <div className={styles.NewsList}>
                        <AssetLiabilityActivityBar title="Assets" handleChat={handleChat} />
                        <AssetLiabilityActivityBar title="Liabilities" handleChat={handleChat} />
                        <AssetLiabilityActivityBar
                            title="Question"
                            handleChat={handleChat}
                            custom
                            customAsk={questionList[0].question}
                        />
                        <AssetLiabilityActivityBar
                            title="Custom Document"
                            handleChat={handleChat}
                            custom
                            customAsk={documentList[0].title}
                        />
                    </div>
                ) : tab == 'tab2' ? (
                    <div className={styles.NewsList}>
                        <AssetLiabilitiesOtherOverview summary buttonText={assetSummaryLinkText} headerText="Assets" />
                        <AssetLiabilitiesOtherOverview
                            summary
                            buttonText={liabilitySummaryLinkText}
                            headerText="Liabilities"
                        />
                        <AssetLiabilitiesOtherOverview
                            summary
                            buttonText={'View Custom Details'}
                            headerText="Question"
                            subHeader={true}
                            subHeaderText={questionList[0].question}
                        />
                        <AssetLiabilitiesOtherOverview
                            summary
                            buttonText={'View Custom Details'}
                            headerText="Document"
                            subHeader={true}
                            subHeaderText={documentList[0].title}
                        />
                    </div>
                ) : tab == 'tab3' ? (
                    <Messaging title={`Messages With ${guarantor}`} messageList={liabilityMessageList} />
                ) : (
                    <IconWithText
                        text="Cancel Guarantor Application?"
                        Icon={Remove}
                        iconAspect={'1.5rem'}
                        color={IconColors.WarningRed}
                        iconOnLeft
                    />
                )}
            </main>
        </div>
    );
};

export default GuarantorProfileActivity;

