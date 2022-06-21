import * as React from 'react';

import { Error } from '../../../Icons';

const styles = require('./validation-messages.module.css');

interface RequiredFieldProps {
    message?: string;
}

const defaultMessage = 'This field is required';

export const RequiredField: React.FC<RequiredFieldProps> = ({ message = defaultMessage }) => (
    <div className={`${styles.ValidationMessage} ${styles.ValidationError}`}>
        <Error />
        {' '}
        <span>{message}</span>
    </div>
);
