import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { FormInputs } from '../../Shared/Forms';
import Description from '../../Shared/PageElements/Description';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';
import DisclaimerText from '../../Shared/PageElements/DisclaimerText';
import NavigationButtons from '../molecules/NavigationButtons';

import { IconColors } from '../../Icons/IconColors';
import styles from './prospective-tenant.module.css';

interface PersonalDataProps {
    aspect: 'string';
    color: IconColors;
    style: React.CSSProperties;
}

const PersonalData: React.FC<PersonalDataProps> = () => {
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Personal Data" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.LeadBox}>
                                <div className={styles.LeadInput}>
                                    <FormInputs.Text
                                        id="lead1"
                                        name="first name"
                                        label="First Name"
                                        fullWidth
                                        required
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className={styles.LeadInput}>
                                    <FormInputs.Text
                                        id="lead1"
                                        name="Last name"
                                        label="Last Name"
                                        fullWidth
                                        required
                                        placeholder="Last Name"
                                    />
                                </div>

                                <div className={styles.LeadInput}>
                                    <FormInputs.Telephone
                                        label="Phone Number"
                                        id="3"
                                        name="Phone"
                                        required
                                        placeholder={'Phone'}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className={styles.flex}>
                                <div className={styles.LeadInputHalf}>
                                    <FormInputs.Text
                                        id="socialNumber"
                                        name="socialNumber"
                                        label="Social Security Number"
                                        fullWidth
                                        required
                                        placeholder="Social Security Number"
                                    />
                                </div>
                                <div className={styles.LeadInputHalf}>
                                    <FormInputs.Text
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        label="Date Of Birth"
                                        fullWidth
                                        required
                                        placeholder="Date Of Birth"
                                    />
                                </div>
                            </div>

                            <NavigationButtons leftTitle={'back'} rightTitle={'Next'} />
                        </Form>
                    )}
                </Formik>
                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </div>
    );
};

export default PersonalData;
