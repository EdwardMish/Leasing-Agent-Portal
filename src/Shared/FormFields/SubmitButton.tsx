import * as React from 'react';

const styles = require('./form-fields.module.css');

interface SubmitButtonProps {
    value: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ value }) => (
    <input type="submit" value={value} className={styles.SubmitButton} />
);
