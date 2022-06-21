import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { CheckBox } from '../../Shared/Forms/Input/CheckBox';
import { IconColors } from '../../Icons/IconColors';
import { Pencil } from '../../Icons/Pencil';
import DisclaimerText from '../../Shared/PageElements/DisclaimerText';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Title from '../../Shared/PageElements/Title';
import Divider from '../../Shared/PageElements/Divider';
import NavigationButtons from '../molecules/NavigationButtons';
import { dummyNewTenantData } from '../dummyData/dummyData';
import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import { FlexWrapper } from '../../Shared/FlexWrapper';

import styles from './confirmation-page.module.css';

interface ConfirmationProps {
    color: IconColors;
}

const ConfirmationPage: React.FC<ConfirmationProps> = ({ color, children }) => {
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Confirmation" />
                <Divider />
                <section>
                    <FlexWrapper justify="between" align="start">
                        <ValueText valueText="Personal Info" />
                        <div className={styles.IconPointer}>
                            <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} />
                        </div>
                    </FlexWrapper>

                    <section className={styles.ConfirmationSectionInfoBoxes}>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Name" row />
                            <ValueText valueText={dummyNewTenantData.personalData.name} small />
                        </FlexWrapper>

                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Phone" row />
                            <ValueText valueText={dummyNewTenantData.personalData.phoneNumber} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Date Of Birth" row />
                            <ValueText valueText={dummyNewTenantData.personalData.dateOfBirth} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="SSN" row />
                            <ValueText valueText={dummyNewTenantData.personalData.socialSecurityNumber} small />
                        </FlexWrapper>
                    </section>
                </section>
                <Divider />

                <section>
                    <FlexWrapper justify="between" align="start">
                        <ValueText valueText="Identification" />
                        <div className={styles.IconPointer}>
                            <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} />
                        </div>
                    </FlexWrapper>

                    <section className={styles.LicenseBox}>
                        <div>
                            <FlexWrapper justify="start" align="center">
                                <KeyText keyText="Type" row />
                                <ValueText valueText={dummyNewTenantData.identification.idType} small />
                            </FlexWrapper>
                            <FlexWrapper justify="start" align="center">
                                <KeyText keyText="ID Number" row />
                                <ValueText valueText={dummyNewTenantData.identification.idNumber} small />
                            </FlexWrapper>
                            <FlexWrapper justify="start" align="center">
                                <KeyText keyText="State" row />
                                <ValueText valueText={dummyNewTenantData.identification.stateOfOrigin} small />
                            </FlexWrapper>
                            <FlexWrapper justify="start" align="center">
                                <KeyText keyText="Number" row />
                                <ValueText valueText={dummyNewTenantData.identification.idNumber} small />
                            </FlexWrapper>
                        </div>
                        <div className={styles.LicenseWrapper}>
                            <img
                                className={styles.license}
                                src="https://www.idscanner.com/wp-content/uploads/2012/02/hi-res-new-MI-DL-march-2011-1.jpg"
                            ></img>
                        </div>
                        <div className={styles.LicenseWrapper}>
                            <img
                                className={styles.license}
                                src="https://images.foxtv.com/static.fox5ny.com/www.fox5ny.com/content/uploads/2020/07/932/524/CBP-fake-Michigan-ID-back.jpg?ve=1&tl=1"
                            ></img>
                        </div>
                    </section>
                </section>
                <Divider />
                <section>
                    <FlexWrapper justify="between" align="start">
                        <ValueText valueText="Address" />
                        <div className={styles.IconPointer}>
                            <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} />
                        </div>
                    </FlexWrapper>

                    <section className={styles.ConfirmationSectionInfoBoxes}>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Address 1" row />
                            <ValueText valueText={dummyNewTenantData.Address.AddressOne} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Address 2" row />
                            <ValueText valueText={dummyNewTenantData.Address.AddressTwo} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="City" row />
                            <ValueText valueText={dummyNewTenantData.Address.City} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="State" row />
                            <ValueText valueText={dummyNewTenantData.Address.State} small />
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="center">
                            <KeyText keyText="Zip Code" row />
                            <ValueText valueText={dummyNewTenantData.Address.Zipcode} small />
                        </FlexWrapper>
                    </section>
                </section>

                <Divider />
                <div>
                    <CheckBox
                        id="checkbox"
                        name="checkbox"
                        display="I hereby declare that the information provided is true and correct."
                    />
                </div>

                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {({ isSubmitting }) => (
                        <Form>
                            <NavigationButtons leftTitle={'back'} rightTitle={'Submit'} />

                            <DisclaimerText disclaimerText="By Submitting this form ... PULL CREDIT" warning right />
                        </Form>
                    )}
                </Formik>
                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </div>
    );
};

export default ConfirmationPage;
