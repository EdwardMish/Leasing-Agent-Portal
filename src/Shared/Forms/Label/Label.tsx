import * as React from 'react';

const styles = require('../forms.module.css');

interface LabelProps {
    label: string;
    id: string;
    required: boolean;
    margin?: string;
    hideLabel?: boolean;
}

export const Label: React.FC<LabelProps> = ({
    id,
    label,
    required,
    margin = '0 0 0.5rem',
    hideLabel = false,
}) => (
    <label
        className={styles.Label}
        htmlFor={id}
        style={{
            display: hideLabel ? 'none' : 'block',
            margin,
        }}
    >
        {`${label}${required ? ' (required)' : ''}`}
    </label>
);
