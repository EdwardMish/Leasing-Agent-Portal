import * as React from 'react';

import { useControlledForm } from './useControlledForm';
import {
    useValidationMessaging,
    useValidationMessagingArgs,
    ValidationMessageHandler,
} from './ValidationMessages';

const styles = require('./form-fields.module.css');

interface TextInputProps {
    formFieldId: string;
    inputValidation: useValidationMessagingArgs;
    label: string;
    name: string;
    isRequired?: boolean;
    initialValue?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    formFieldId,
    isRequired = false,
    inputValidation,
    label,
    name,
    initialValue,
}) => {
    const [inputValue, handler] = useControlledForm(initialValue);
    const [validationState, validationHandler] = useValidationMessaging(inputValidation);

    return (
        <>
            <label className={styles.label} htmlFor={formFieldId}>
                {label}
                {' '}
                {isRequired && <span className="required">(required)</span>}
            </label>
            <input
                className={`${styles.input} ${styles.inputText}`}
                id={formFieldId}
                name={name}
                type="text"
                value={inputValue}
                onChange={handler}
                onBlur={validationHandler}
            />
            <ValidationMessageHandler currentState={validationState} />
        </>
    );
};
