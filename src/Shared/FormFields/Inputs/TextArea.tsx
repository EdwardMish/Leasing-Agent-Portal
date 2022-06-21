import * as React from 'react';

const formStyles = require('../form-fields.module.css');

interface InputTextAreaProps {
    id: string;
    name: string;
    value: string;
    handler: (e: React.FormEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    formRow?: boolean;
    hidden?: boolean;
}

export const TextArea: React.FC<InputTextAreaProps> = ({
    id,
    name,
    value,
    handler,
    required = false,
    formRow = false,
    hidden = false,
}) => (
    <>
        <label className={`${formStyles.InputElementLabel} ${hidden ? formStyles.Hidden : ''}`} htmlFor={id}>{`${name} ${required ? '(required)' : ''}`}</label>
        <textarea
            className={`${formStyles.InputElement} ${formStyles.TextAreaInput} ${formRow ? formStyles.FormRow : ''} ${hidden ? formStyles.Hidden : ''}`}
            id={id}
            name={name}
            value={value}
            onChange={handler}
            required={required}
            rows={5}
        />
    </>
);
