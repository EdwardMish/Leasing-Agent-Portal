import * as React from 'react';

const formStyles = require('../form-fields.module.css');

interface InputEmailProps {
    id: string;
    name: string;
    value: string;
    handler: (e: React.FormEvent<HTMLInputElement>) => void;
    required?: boolean;
    formRow?: boolean;
    hidden?: boolean;
}

export const Email: React.FC<InputEmailProps> = ({
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
        <input
            className={`${formStyles.InputElement} ${formRow ? formStyles.FormRow : ''} ${hidden ? formStyles.Hidden : ''}`}
            id={id}
            name={name}
            type="email"
            value={value}
            onChange={handler}
            required={required}
        />
    </>
);
