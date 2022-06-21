import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { FormInputs } from '../../Shared/Forms';
import NavigationButtons from '../molecules/NavigationButtons';
import Description from '../../Shared/PageElements/Description';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';

import styles from './prospective-tenant.module.css';

interface NewLeadProps {}

const NewLead: React.FC<NewLeadProps> = () => {
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="New Lead" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {() => (
                        <Form>
                            <div className={styles.LeadInput} style={{ paddingTop: '1rem' }}>
                                <FormInputs.Text
                                    id="lead1"
                                    name="email"
                                    label="Name"
                                    fullWidth
                                    required
                                    placeholder="Name"
                                />
                            </div>
                            <label className={styles.MockLabel}>Add Details</label>
                            <textarea className={styles.MockTextArea} placeholder={'Add Details/Notes'} />

                            <NavigationButtons leftTitle={'Cancel'} rightTitle={'Create'} />
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    );
};

export default NewLead;

