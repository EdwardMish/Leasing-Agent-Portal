import { FieldHookConfig, useField } from 'formik';
import * as React from 'react';
import { Label } from '../Label';

import styles from '../forms.module.css';

export interface SelectProps {
    label: string;
    id: string;
    name: string;
    hideLabel?: boolean;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<any>) => void;
    style?: React.CSSProperties;
    fullWidth?: boolean;
    keyValues?: Record<string, any>;
}

const Select: React.FC<
    SelectProps & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
> = ({ label, id, hideLabel = false, required = false, style = {}, keyValues = null, ...props }) => {
    const [field, meta] = useField(props as any | FieldHookConfig<any>);

    let keyValueOptions: React.ReactElement[] | null = null;

    if (!!keyValues) {
        keyValueOptions = Object.keys(keyValues).map((key) => (
            <option key={key} value={key}>
                {keyValues[key]}
            </option>
        ));
    }

    return (
        <>
            <Label label={label} id={id} required={required} hideLabel={hideLabel} />
            <select
                name={field.name}
                multiple={field.multiple}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(e: React.ChangeEvent<any>) => {
                    if (!!props.onChange) props.onChange(e);
                    field.onChange(e);
                }}
                className={styles.SelectElement}
                style={style}
            >
                {!!keyValues ? keyValueOptions : props.children}
            </select>
            {meta.touched && meta.error && <div className={styles.Error}>{<span>{meta.error}</span>}</div>}
        </>
    );
};

export default Select;
