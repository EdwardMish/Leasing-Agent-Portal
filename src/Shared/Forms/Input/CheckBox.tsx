import * as React from 'react';
import { useField } from 'formik';

const styles = require('../forms.module.css');

interface CheckboxProps {
    id: string;
    name: string;
    display: string;
    required?: boolean;
}

export const CheckBox: React.FC<CheckboxProps> = ({ children, id, required = false, display, ...props }) => {
    const [field, meta] = useField(props as any);
    return (
        <>
            <label className={styles.CheckBox}>
                <input type="checkbox" checked={field.value || false} {...field} />
                <span>{display}</span>
            </label>
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};
