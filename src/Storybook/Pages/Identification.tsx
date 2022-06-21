import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import Tabs from '../molecules/Tabs';
import MobileTabHeader from '../molecules/MobileTabHeader';
import StateIDForm from '../molecules/StateIDForm';
import PassportForm from '../molecules/PassportForm';
import { Description } from '../../Shared/PageElements';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';
import DisclaimerText from '../../Shared/PageElements/DisclaimerText';

import styles from './prospective-tenant.module.css';

const Identification = ({ aspect, color, style, handleFiles }) => {
    const [tab, setTab] = useState('tab1');
    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
    };

    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Identification" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>

                <DisclaimerText disclaimerText="Only one form of Identification is required" />
                <div className={styles.DesktopTabHeader}>
                    <Tabs
                        tab={tab}
                        handleTab={handleTab}
                        tabName1={'State Identification'}
                        tabName2={'Passport'}
                        tabName3={''}
                    />
                </div>
                <div className={styles.MobileTabHeader}>
                    <MobileTabHeader
                        title={'tabs'}
                        handleTab={handleTab}
                        tab1={'State Identification'}
                        tab2={'Passport'}
                        tab3={''}
                        // addOption
                    />
                </div>

                <Divider />

                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {({ isSubmitting }) => (
                        <Form>
                            {tab == 'tab1' ? (
                                <StateIDForm isSubmitting={isSubmitting} handleFiles={handleFiles} />
                            ) : tab == 'tab2' ? (
                                <PassportForm handleFiles={handleFiles} />
                            ) : (
                                ''
                            )}
                        </Form>
                    )}
                </Formik>

                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </div>
    );
};

export default Identification;
