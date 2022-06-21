import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import styles from 'Shared/Forms/forms.module.css';

const WithFormikFieldWrapper = ({ name, value, children }) => {
    const [, meta] = useField({ name });
    const formik = useFormikContext();

    useEffect(() => {
        formik.setFieldValue(name, value);
    }, [value]);

    return (
        <>
            {children}
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};

export default WithFormikFieldWrapper;
