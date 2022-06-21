import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import NavigationButtons from '../molecules/NavigationButtons';
import Task from '../molecules/CustomTask';
import Tabs from '../molecules/Tabs';
import { Description, KeyText, ValueText } from '../../Shared/PageElements';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';

import styles from '../Pages/prospective-tenant.module.css';
import shortcutStyles from './create-custom-tasks.module.css';

interface CustomTaskProps {}

const CustomTask: React.FC<CustomTaskProps> = () => {
    const [tab, setTab] = useState('tab1');

    const handleTab = ({ target }) => {
        if (target.value == 'tab1') setTab('tab1');
        if (target.value == 'tab2') setTab('tab2');
    };

    const taskShortcuts = [
        { id: '1', text: 'Request Last Years Tax Return' },
        { id: '2', text: 'Request Last Two Years Tax returns' },
        { id: '3', text: 'Request a Business Plan' },
        { id: '4', text: 'Request A Bank Loan - Letter Of Commitment' },
        { id: '5', text: 'Have you ever declared bankruptcy?' },
        {
            id: '6',
            text: 'Do you have any other liabilities not listed in this application or present on your credit report?',
        },
    ];
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Add Task" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <Tabs tab={tab} handleTab={handleTab} tabName1={'Task Shortcuts'} tabName2={'Create Custom Task'} />
                <Divider />
                <Formik initialValues={{}} onSubmit={() => console.log('submitted!')} validationSchema={Yup.object({})}>
                    {() => (
                        <Form>
                            {tab === 'tab1' ? (
                                <>
                                    <div className={shortcutStyles.documents}>
                                        <KeyText keyText="Frequently Requested Documents" />
                                        {taskShortcuts.slice(0, 4).map((task) => (
                                            <div className={shortcutStyles.checkbox}>
                                                <input type="checkbox" id={task.id} name={task.id} />
                                                <label>{task.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={shortcutStyles.questions}>
                                        <KeyText keyText="Frequently Asked Questions" />
                                        {taskShortcuts.slice(4, 6).map((task) => (
                                            <div className={shortcutStyles.checkbox}>
                                                <input type="checkbox" id={task.id} name={task.id} />
                                                <label>{task.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Task />
                            )}

                            <NavigationButtons leftTitle={'Cancel'} rightTitle={'Add Task(s)'} />
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    );
};

export default CustomTask;

