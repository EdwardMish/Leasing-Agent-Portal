import React, { useState } from 'react';

import ProfileSnapshot from '../molecules/GuarantorProfileSnapshot';
import AssetLiabilitiesOtherOverview from '../molecules/AssetLiabilitiesOtherOverview';
import Tabs from '../molecules/Tabs';
import Divider from '../../Shared/PageElements/Divider';
import QuestionDetail from '../molecules/QuestionDetail';
import MobileTabHeader from '../molecules/MobileTabHeader';

import styles from './guarantor-profile-overview.module.css';
import generalStyles from './prospective-tenant.module.css';

interface GuarantorSummaryProps {}

const GuarantorSummary: React.FC<GuarantorSummaryProps> = () => {
    const [tab, setTab] = useState('tab1');

    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
        if (target.value == 'tab3') setTab('tab3');
    };

    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <ProfileSnapshot
                    guarantor={'Fred Tenant'}
                    leadName={'Lead #1234'}
                    buttonText={'Output Summary'}
                    summary={true}
                    print
                />
                <div className={styles.DesktopTabHeader}>
                    <Tabs tab={tab} handleTab={handleTab} tabName1={'Assets'} tabName2={'Liabilities'} tabName3={'Other'} />
                </div>
                <div className={generalStyles.MobileTabHeader}>
                    <MobileTabHeader
                        title={'tabs'}
                        handleTab={handleTab}
                        tab1={'Assets'}
                        tab2={'Liabilities'}
                        tab3={'Other'}
                    />
                </div>

                <Divider />
                {tab == 'tab1' ? (
                    <AssetLiabilitiesOtherOverview asset />
                ) : tab == 'tab2' ? (
                    <AssetLiabilitiesOtherOverview />
                ) : tab == 'tab3' ? (
                    <>
                        <AssetLiabilitiesOtherOverview other />
                        <QuestionDetail edit={false} />
                    </>
                ) : (
                    'error loading content'
                )}
            </main>
        </div>
    );
};

export default GuarantorSummary;

