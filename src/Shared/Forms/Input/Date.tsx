import * as React from 'react';
import { useField } from 'formik';

import { Label } from '../Label';

const styles = require('../forms.module.css');

interface DateProps {
    label: string;
    id: string;
    name: string;
    required?: boolean;
    fullWidth?: boolean;
    matchInput?: boolean;
}

export const Date: React.FC<DateProps> = ({
    id,
    label,
    required = false,
    fullWidth = false,
    matchInput = false,
    ...props
}) => {
    const [field, meta] = useField(props as any);

    return (
        <>
            <Label label={label} id={id} required={required} />
            <input
                className={styles.InputElement}
                type="date"
                style={{
                    width: fullWidth ? '100%' : 'auto',
                    padding: matchInput ? '0.6rem 0.5rem' : '0.75rem 0.5rem',
                }}
                {...field}
            />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};
