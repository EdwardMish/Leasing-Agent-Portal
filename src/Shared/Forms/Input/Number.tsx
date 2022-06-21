import * as React from 'react';
import { useField } from 'formik';

import { Label } from '../Label';

import styles from '../forms.module.css';

interface NumberProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Number: React.FC<NumberProps> = ({
  id,
  label,
  required = false,
  fullWidth = false,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  return (
    <>
      <Label label={label} id={id} required={required} />
      <input
        className={styles.InputElement}
        type="number"
        style={{ width: fullWidth ? '100%' : 'auto' }}
        {...field}
      />
      {meta.touched && meta.error && (
        <div className={styles.Error}>{<span>{meta.error}</span>}</div>
      )}
    </>
  );
};
