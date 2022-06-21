import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { FormInputs } from '../../Shared/Forms';
import { Description } from '../../Shared/PageElements';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';
import DisclaimerText from '../../Shared/PageElements/DisclaimerText';
import NavigationButtons from '../molecules/NavigationButtons';

import styles from './prospective-tenant.module.css';

interface AddressProps {}

const Address: React.FC<AddressProps> = () => {
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Address" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>

                <Divider />

                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.LeadInput}>
                                <FormInputs.Text
                                    id="address1"
                                    name="Address1"
                                    label="Address 1"
                                    fullWidth
                                    // hideLabel
                                    required
                                    placeholder="Address 1"
                                />
                            </div>
                            <div className={styles.LeadInput}>
                                <FormInputs.Text
                                    id="address2"
                                    name="Address2"
                                    label="Address 2"
                                    fullWidth
                                    // hideLabel
                                    // required
                                    placeholder="Address 2"
                                />
                            </div>
                            <div className={styles.LeadInput}>
                                <FormInputs.Text
                                    id="City"
                                    name="City"
                                    label="City"
                                    fullWidth
                                    // hideLabel
                                    required
                                    placeholder="City"
                                />
                            </div>
                            <div className={styles.flex}>
                                <div className={styles.LeadInputHalf}>
                                    <FormInputs.Text
                                        id="State"
                                        name="State"
                                        label="State"
                                        fullWidth
                                        // hideLabel
                                        required
                                        placeholder="State"
                                    />
                                </div>
                                <div className={styles.LeadInputHalf}>
                                    <FormInputs.Text
                                        id="Zip Code"
                                        name="Zip Code"
                                        label="Zip Code"
                                        fullWidth
                                        // hideLabel
                                        required
                                        placeholder="Zip Code"
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

export default Address;

