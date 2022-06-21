import * as React from 'react';
import { useField } from 'formik';

import { Label } from '../Label';

const styles = require('../forms.module.css');

interface HiddenProps {
    label: string;
    id: string;
    name: string;
    required?: boolean;
    value?: any;
}

export const Hidden: React.FC<HiddenProps> = ({ id, label, required = false, value, ...props }) => {
    const [field, meta, helper] = useField(props as any);

    React.useEffect(() => {
        if (value) {
            helper.setValue(value);
        }
    }, [value]);

    return (
        <>
            <Label label={label} id={id} required={required} hideLabel />
            <input type="hidden" {...field} />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};

