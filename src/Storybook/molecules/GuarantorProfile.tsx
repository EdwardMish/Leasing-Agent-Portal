import * as React from 'react';

import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import { PersonalData, Identification, DummyAddress } from '../dummyData/dummyData';
import { FlexWrapper } from '../../Shared/FlexWrapper';

import styles from '../Pages/guarantor-profile-activity.module.css';

const GuarantorProfile = () => {
    return (
        <div className={styles.ProfileWrapper}>
            <FlexWrapper justify="between" align="start" wrap>
                <section className={styles.CreditProfileScore}>
                    {PersonalData.map((data) => (
                        <div className={styles.KeyValueSpacing}>
                            <KeyText keyText={data.key} />
                            <ValueText valueText={data.value} small />
                        </div>
                    ))}
                </section>

                <section className={styles.CreditProfileScore}>
                    {Identification.map((data) => (
                        <div className={styles.KeyValueSpacing}>
                            <KeyText keyText={data.key} />
                            <ValueText valueText={data.value} small />
                        </div>
                    ))}
                </section>

                <section className={styles.CreditProfileScore}>
                    <div className={styles.KeyValueSpacing}>
                        <KeyText keyText="Address One" />
                        <ValueText valueText={DummyAddress.AddressOne} small />
                    </div>
                    <div className={styles.KeyValueSpacing}>
                        <KeyText keyText="Address Two" />
                        <ValueText valueText={DummyAddress.AddressTwo} small />
                    </div>
                    <div className={styles.KeyValueSpacing}>
                        <KeyText keyText="City" />
                        <ValueText valueText={DummyAddress.City} small />
                    </div>
                </section>
                <section className={styles.CreditProfileScore}>
                    <div className={styles.KeyValueSpacing}>
                        <KeyText keyText="State" />
                        <ValueText valueText={DummyAddress.State} small />
                    </div>
                    <div className={styles.KeyValueSpacing}>
                        <KeyText keyText="Zip Code" />
                        <ValueText valueText={DummyAddress.Zipcode} small />
                    </div>
                </section>
            </FlexWrapper>
        </div>
    );
};

export default GuarantorProfile;
