import React from 'react';
import { Field } from 'formik';
import styles from './commontask.module.css';
import { subYears } from 'date-fns';

const documents = [
    `${subYears(new Date(), 1).getFullYear()} Tax Return`,
    `${subYears(new Date(), 2).getFullYear()} Tax Return`,
    'Business Plan',
    'Bank Loan - Letter Of Commitment',
];

const questions = [
    'Have you ever declared bankruptcy?',
    'Do you have any other liabilities not listed in this application or present on your credit report?',
];

const CommonTask = () => {
    return (
        <div className={styles.ScrollWrapper}>
            <div className={styles.TaskHeading}>Frequently Requested Documents:</div>
            {documents.map((document, index) => (
                <div key={`document-request-${index}`} className={styles.FormRow}>
                    <label className={styles.TaskLabel}>
                        <Field type="checkbox" name="commonDocuments" value={document} className={styles.TaskCheckbox} />
                        {document}
                    </label>
                </div>
            ))}
            <div className={styles.TaskHeading}>Frequently Asked Questions:</div>
            {questions.map((question, index) => (
                <div key={`question-request-${index}`} className={styles.FormRow}>
                    <label className={styles.TaskLabel}>
                        <Field type="checkbox" name="commonQuestions" value={question} className={styles.TaskCheckbox} />
                        {question}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CommonTask;

