import { useField } from 'formik';
import * as React from 'react';

import { Label } from '../Label';

import styles from '../forms.module.css';
import { debounce } from '@material-ui/core';

interface EmailProps {
    label: string;
    id: string;
    name: string;
    required?: boolean;
    hideLabel?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
    debounceOnChange?: number;
}

export const Email: React.FC<EmailProps> = ({
    id,
    label,
    required = false,
    hideLabel,
    fullWidth = false,
    placeholder,
    onChange,
    debounceOnChange = 250,
    ...props
}) => {
    const [field, meta] = useField(props as any);

    const debouncedOnChange = React.useMemo(
        () => debounce((value: string) => (onChange ? onChange(value) : null), debounceOnChange),
        [],
    );

    const handleChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            field.onChange(event);
            const value = event.currentTarget.value;
            debouncedOnChange(value);
        },
        [field],
    );

    const inputPlaceholder = placeholder || label || field?.name || '';

    const formatPlaceholder = (): string => (required ? `${inputPlaceholder} (required)` : inputPlaceholder);

    return (
        <>
            <Label label={label} id={id} required={required} hideLabel={hideLabel} />
            <input
                {...field}
                className={styles.InputElement}
                placeholder={formatPlaceholder()}
                style={{
                    width: fullWidth ? '100%' : 'auto',
                    borderLeft: required && hideLabel ? '2px solid rgb(75,75,75)' : '',
                }}
                onChange={(e) => handleChange(e)}
                type="email"
            />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};
