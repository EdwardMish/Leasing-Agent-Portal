import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { FormInputs } from '../../Shared/Forms';
import { Description } from '../../Shared/PageElements';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';
import NavigationButtons from '../molecules/NavigationButtons';
import { IconColors } from '../../Icons/IconColors';

import styles from './prospective-tenant.module.css';

interface AddGuarantorProps {
    placeholder: 'string';
    aspect: 'string';
    color: IconColors;
    style: React.CSSProperties;
}

const AddGuarantor: React.FC<AddGuarantorProps> = ({ placeholder, aspect, color, style }) => {
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Add Guarantor" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {() => (
                        <Form>
                            <div className={styles.LeadInput} style={{ marginTop: '1rem' }}>
                                <FormInputs.Text
                                    id="lead1"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    required
                                    placeholder="Email"
                                />
                            </div>
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

                            <NavigationButtons leftTitle={'Cancel'} rightTitle={'Add Guarantor'} />
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    );
};

export default AddGuarantor;
