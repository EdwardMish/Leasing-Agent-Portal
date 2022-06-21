import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import Title from '../../Shared/PageElements/Title';
import NavigationButtons from '../molecules/NavigationButtons';
import AssetsandLiabilitiesForm from '../molecules/AssetsandLiabilitiesForm';
import Divider from '../../Shared/PageElements/Divider';

import styles from './assets-liabilities.module.css';

interface AssetsProps {}

const Assets: React.FC<AssetsProps> = () => {
    const [joint, setJoint] = useState(1);
    const [amount, setAmount] = useState('Cash');

    const handleAccountChange = ({ target }) => {
        setJoint(target.value);
    };

    const handleOtherChange = ({ target }) => {
        setAmount(target.value);
    };

    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Asset Upload" />
                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {() => (
                        <Form>
                            <AssetsandLiabilitiesForm
                                handleAccountChange={handleAccountChange}
                                handleOtherChange={handleOtherChange}
                                joint={joint}
                                amount={amount}
                                number={1}
                                title={'Asset'}
                                dd1opt1={'Cash'}
                                dd1opt2={'IRA'}
                                dd1opt3={'Brokerage'}
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

export default Assets;

