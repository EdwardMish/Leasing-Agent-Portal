import React, { useState } from 'react';

import { ChevronDoubleLeft, ChevronDoubleRight, ChevronRight, ChevronLeft, IconColors, Add } from '../../Icons';
import Tabs from '../molecules/Tabs';
import Title from '../../Shared/PageElements/Title';
import Divider from '../../Shared/PageElements/Divider';
import { IconWithText } from '../../Shared/PageElements';
import { leadnames } from '../dummyData/dummyData';
import MobileTabHeader from '../molecules/MobileTabHeader';

import styles from './prospective-tenant.module.css';

interface LeasingHomeProps {}

const LeasingHome: React.FC<LeasingHomeProps> = () => {
    const [tab, setTab] = useState('tab1');
    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
    };

    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Leasing" />
                <div className={styles.DesktopTabHeader}>
                    <div className={styles.HeaderWrapper}>
                        <Tabs
                            tab={tab}
                            handleTab={handleTab}
                            tabName1={'In Progress'}
                            tabName2={'Completed'}
                            tabName3={''}
                        />

                        <IconWithText text="Create Application" Icon={Add} iconAspect={'1.2rem'} />
                    </div>
                </div>
                <div className={styles.MobileTabHeader}>
                    <MobileTabHeader
                        title={'tabs'}
                        handleTab={handleTab}
                        tab1={'In Progress'}
                        tab2={'Completed'}
                        tab3={''}
                        addOption
                    />
                </div>
                <Divider />
                <div className={styles.MockSearchwrapper}>
                    <input className={styles.MockSearchInput} placeholder={'Search Leads'} />
                </div>
                <div
                    className={styles.MockTableData}
                    style={{
                        backgroundColor: '#f5f5f5',
                        borderTop: 'solid 1px #a5a5a5',
                        borderBottom: 'solid 1px #a5a5a5',
                        marginTop: '1rem',
                    }}
                >
                    <div className={styles.MockRow}>
                        <p className={styles.MockHeader}>Name</p>
                    </div>
                    <div className={styles.MockRow} style={{ textAlign: 'center' }}>
                        <p className={styles.MockHeader}>Created</p>
                    </div>
                    <div className={styles.MockRow} style={{ textAlign: 'right' }}>
                        <p className={styles.MockHeader}>Last Activity</p>
                    </div>
                </div>
                {leadnames.map((lead) => (
                    <div className={styles.MockTableData}>
                        <div className={styles.MockRow}>
                            <p>{lead.name}</p>
                        </div>
                        <div className={styles.MockRow} style={{ textAlign: 'center' }}>
                            <p>{lead.dateCreated}</p>
                        </div>
                        <div className={styles.MockRow} style={{ textAlign: 'right' }}>
                            <p>{lead.lastInteraction}</p>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex' }}>
                    <div
                        className={styles.MockTableFooterMain}
                        style={{
                            backgroundColor: '#f5f5f5',
                            borderTop: 'solid 1px #a5a5a5',
                            borderBottom: 'solid 1px #a5a5a5',
                            paddingRight: '.5rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <p className={styles.MockHeader}>Rows: 7</p>
                            <ChevronRight color={IconColors.BrandBlue} />
                        </div>
                        <p className={styles.MockHeader}> 1 - 1 of 1</p>
                    </div>
                    <div className={styles.MockTableFooterEnd}>
                        <ChevronDoubleLeft color={IconColors.BrandBlue} />
                    </div>
                    <div className={styles.MockTableFooterEnd}>
                        <ChevronLeft color={IconColors.BrandBlue} />
                    </div>
                    <div className={styles.MockTableFooterEnd}>
                        <ChevronRight color={IconColors.BrandBlue} />
                    </div>
                    <div className={styles.MockTableFooterEnd}>
                        <ChevronDoubleRight color={IconColors.BrandBlue} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeasingHome;
