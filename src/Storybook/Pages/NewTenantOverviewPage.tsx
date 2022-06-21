import React, { useState } from 'react';

import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import { Description } from '../../Shared/PageElements';
import Title from '../../Shared/PageElements/Title';
import { Required, Completed } from '../molecules/OverviewRequired';
import OverviewSidebar from '../molecules/OverviewSidebar';
import Tabs from '../molecules/Tabs';
import MobileTabHeader from '../molecules/MobileTabHeader';
import Divider from '../../Shared/PageElements/Divider';
import Messaging from './Messaging';
import { liabilityMessageList } from '../dummyData/dummyData';

import styles from './prospective-tenant.module.css'; 

interface NewTenantProps {}

const NewTenantOverviewPage: React.FC<NewTenantProps> = () => {
    const [tab, setTab] = useState('tab1');

    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
        if (target.value == 'tab3') setTab('tab3');
    };
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Account Overview" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <OverviewSidebar />
                <div className={styles.DesktopTabHeader}>
                    <Tabs
                        tab={tab}
                        handleTab={handleTab}
                        tabName1={'Required'}
                        tabName2={'Complete'}
                        tabName3={'Messaging'}
                    />
                </div>
                <div className={styles.MobileTabHeader}>
                    <MobileTabHeader
                        title={'tabs'}
                        handleTab={handleTab}
                        tab1={'Required'}
                        tab2={'Complete'}
                        tab3={'Messaging'}
                    />
                </div>

                <Divider />
                {tab == 'tab1' ? (
                    <Required />
                ) : tab == 'tab2' ? (
                    <Completed />
                ) : tab == 'tab3' ? (
                    <Messaging title="Messages With Leasing Agent" messageList={liabilityMessageList} />
                ) : (
                    'error loading content'
                )}
            </main>
        </div>
    );
};

export default NewTenantOverviewPage;

