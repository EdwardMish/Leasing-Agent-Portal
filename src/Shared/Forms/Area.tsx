import * as React from 'react';
import { FieldInputProps, useField } from 'formik';

import { Label } from './Label';

import styles from './forms.module.css';

interface AreaProps {
    label: string;
    id: string;
    name: string;
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    disabled?: boolean;
    style?: React.CSSProperties;
    onBlur?: (stuff: any, field: any) => void;
    onChange?: (stuff: any, field: any) => void;
}

const Area: React.FC<AreaProps> = ({
    id,
    label,
    required = false,
    hideLabel = false,
    placeholder = 'Enter text here...',
    rows = 7,
    disabled = false,
    style,
    onBlur,
    onChange,
    ...props
}) => {
    const [field, meta] = useField(props as any);

    const handleBlur = (field: FieldInputProps<any>, e: React.FormEvent<HTMLTextAreaElement>) => {
        if (onBlur) onBlur(field, e);

        field.onBlur(e);
    };

    const handleChange = (field: FieldInputProps<any>, e: React.FormEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(field, e);

        field.onChange(e);
    };

    return (
        <>
            <Label hideLabel={hideLabel} label={label} id={id} required={required} />
            <textarea
                className={styles.TextArea}
                rows={rows}
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                onBlur={(e) => handleBlur(field, e)}
                onChange={(e) => handleChange(field, e)}
                required={required}
                style={style}
            />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};

export default Area;
