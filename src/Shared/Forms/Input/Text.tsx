import * as React from 'react';
import { FieldInputProps, useField } from 'formik';

import { Label } from '../Label';

import styles from '../forms.module.css';

interface TextProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  hideLabel?: boolean;
  onBlur?: (stuff: any, field: any) => void;
  onChange?: (stuff: any, field: any) => void;
}

export const Text: React.FC<TextProps> = ({
  id,
  label,
  required = false,
  fullWidth = false,
  hideLabel = false,
  placeholder,
  onBlur,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputPlaceholder = placeholder || label || field?.name || '';

  const formatPlaceholder = (): string =>
    required ? `${inputPlaceholder} (required)` : inputPlaceholder;

  const handleBlur = (
    field: FieldInputProps<any>,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    if (onBlur) onBlur(field, e);

    field.onBlur(e);
  };

  const handleChange = (
    field: FieldInputProps<any>,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    if (onChange) onChange(field, e);

    field.onChange(e);
  };

  return (
    <>
      <Label label={label} hideLabel={hideLabel} id={id} required={required} />
      <input
        {...field}
        className={styles.InputElement}
        type="text"
        placeholder={formatPlaceholder()}
        style={{
          width: fullWidth ? '100%' : 'auto',
          borderLeft: required && hideLabel ? '2px solid rgb(75,75,75)' : '',
        }}
        onBlur={(e) => handleBlur(field, e)}
        onChange={(e) => handleChange(field, e)}
      />
      {meta.touched && meta.error && (
        <div className={styles.Error}>
          <span>{meta.error}</span>
        </div>
      )}
    </>
  );
};
