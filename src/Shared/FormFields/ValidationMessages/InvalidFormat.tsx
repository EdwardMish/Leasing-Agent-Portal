import * as React from 'react';

import { Error } from '../../../Icons';

const styles = require('./validation-messages.module.css');

interface InvalidFormatProps {
    message?: string;
}

const defaultMessage = 'The format you\'ve entered is invalid';

export const InvalidFormat: React.FC<InvalidFormatProps> = ({ message = defaultMessage }) => (
    <div className={`${styles.ValidationMessage} ${styles.ValidationError}`}>
        <Error />
        {' '}
        <span>{message}</span>
    </div>
);
