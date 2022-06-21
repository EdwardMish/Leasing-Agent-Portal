import * as React from 'react';

const styles = require('./form-fields.module.css');

interface CheckBoxProps {
    id: string;
    label: string;
    name: string;
    checkedByDefault?: boolean;
    handler?: (checked: boolean) => void;
    required?: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
    id,
    label,
    name,
    checkedByDefault = false,
    handler,
    required = false,
}) => {
    const [checked, toggleChecked] = React.useState<boolean>(checkedByDefault);

    const handleChange = (): void => {
        if (handler) {
            handler(!checked);
        }

        toggleChecked(!checked);
    };

    return (
        <div className={styles.CheckBox}>
            <input
                checked={checked}
                id={id}
                name={name}
                type="checkbox"
                onChange={handleChange}
                value={checked ? 'true' : 'false'}
            />
            <label className={styles.CheckboxLabel} htmlFor={id}>{`${label} ${required ? '(required)' : ''}`}</label>
        </div>
    );
};
