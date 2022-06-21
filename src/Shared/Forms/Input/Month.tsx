import * as React from 'react';
import { useField } from 'formik';

import { Label } from '../Label';

const styles = require('../forms.module.css');

interface MonthProps {
    label: string;
    id: string;
    name: string;
    required?: boolean;
}

export const Month: React.FC<MonthProps> = ({
    id,
    label,
    required = false,
    ...props
}) => {
    const [field, meta] = useField(props as any);

    return (
        <>
            <Label label={label} id={id} required={required} />
            <input className={styles.InputElement} type="month" {...field} />
            {
                meta.touched && meta.error
                && <div className={styles.Error}><span>{meta.error}</span></div>
            }
        </>
    );
};
