import * as React from 'react';

const formStyles = require('../form-fields.module.css');

interface SelectStringProps {
    id: string;
    name: string;
    options: {
        value: string;
        display: string;
    }[];
    label?: string;
    required?: boolean;
    formRow?: boolean;
    handler: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export const SelectString: React.FC<SelectStringProps> = ({
    id,
    name,
    options,
    label = name,
    required = false,
    formRow = false,
    handler,
}) => {
    const [current, setCurrent] = React.useState<string>(options[0].value);

    const handleChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const { target } = e as any;

        setCurrent(target.value);
        handler(e);
    };

    return (
        <>
            <label className={formStyles.InputElementLabel} htmlFor={id}>{`${label} ${required ? '(required)' : ''}`}</label>
            <select
                className={`${formStyles.InputElement} ${formRow ? formStyles.FormRow : ''}`}
                id={id}
                name={name}
                value={current}
                onChange={handleChange}
                required={required}
            >
                {
                    options.map(({ value, display }) => <option key={`select-string-${value}`} value={value}>{display}</option>)
                }
            </select>
        </>
    );
};
