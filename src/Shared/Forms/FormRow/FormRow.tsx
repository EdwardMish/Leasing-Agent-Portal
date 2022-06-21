import React from 'react';

const styles = require('./form-row.module.css');

interface FormRowProps {
    withMargin?: boolean;
}

export const FormRow: React.FC<FormRowProps> = ({ withMargin = true, children }) => (
    <div className={styles.FormRow} style={{ margin: withMargin ? '0 0 1rem' : '0' }}>
        {children}
    </div>
);
