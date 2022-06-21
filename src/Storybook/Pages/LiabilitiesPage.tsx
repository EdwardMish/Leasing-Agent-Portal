import { Form, Formik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import Title from '../../Shared/PageElements/Title';
import NavigationButtons from '../molecules/NavigationButtons';
import AssetsandLiabilitiesForm from '../molecules/AssetsandLiabilitiesForm';
import Divider from '../../Shared/PageElements/Divider';

import styles from './assets-liabilities.module.css';

interface LiabilitiesProps {}

const Liabilities: React.FC<LiabilitiesProps> = () => {
    const [joint, setJoint] = useState(1);
    const [amount, setAmount] = useState('Credit Card');

    const handleAccountChange = ({ target }) => {
        setJoint(target.value);
    };

    const handleOtherChange = ({ target }) => {
        setAmount(target.value);
    };

    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Liability Upload" />

                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {({ isSubmitting }) => (
                        <Form>
                            <AssetsandLiabilitiesForm
                                handleAccountChange={handleAccountChange}
                                handleOtherChange={handleOtherChange}
                                joint={joint}
                                amount={amount}
                                number={1}
                                title={'Liability'}
                                dd1opt1={'Credit Card'}
                                dd1opt2={'Loan'}
                                dd1opt3={'Mortgage'}
                                dd1opt4={'Other'}
                            />

                            <NavigationButtons leftTitle="Back" rightTitle="Save" />
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    );
};

export default Liabilities;

