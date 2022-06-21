import * as React from 'react';
import { useField } from 'formik';

import { Label } from '../Label';

import styles from '../forms.module.css';

interface HorizontalSelectProps {
  id: string;
  name: string;
  label: string;
  labelWidth?: string;
  selectWidth?: string;
  hideLabel?: boolean;
  required?: boolean;
  column?: boolean;
  fullHeight?: boolean;
}

export const HorizontalSelect: React.FC<HorizontalSelectProps> = ({
  id,
  label,
  hideLabel = false,
  labelWidth = 'auto',
  selectWidth = 'auto',
  required = false,
  column,
  fullHeight,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: column ? 'flex-start' : 'center',
          flexDirection: column ? 'column' : 'row',
          height: fullHeight ? '100%' : 'auto',
        }}
      >
        <div style={{ width: labelWidth }}>
          <Label
            hideLabel={hideLabel}
            label={label}
            id={id}
            required={required}
          />
        </div>
        <select
          style={{ width: selectWidth, height: column ? '100%' : 'auto' }}
          className={styles.HorizontalSelectElement}
          {...field}
        >
          {props.children}
        </select>
      </div>
      {meta.touched && meta.error && (
        <div className={styles.Error}>{<span>{meta.error}</span>}</div>
      )}
    </>
  );
};
