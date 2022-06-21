import { FieldInputProps, useField } from "formik";
import * as React from "react";

import { formatPhone, TELEPHONE_REGEXP } from "../../../utils/formatPhone";

import { Label } from "../Label";

const styles = require("../forms.module.css");

interface TelephoneProps {
    label: string;
    id: string;
    name: string;
    placeholder?: string;
    hideLabel?: boolean;
    fullWidth?: boolean;
    patternRegExp?: string;
    required?: boolean;
}

const Telephone: React.FC<TelephoneProps> = ({
    id,
    label,
    required = false,
    fullWidth = false,
    hideLabel = false,
    patternRegExp = TELEPHONE_REGEXP,
    ...props
}) => {
    const [field, meta, helper] = useField(props as any);

    const telephoneRegExp = new RegExp(TELEPHONE_REGEXP);

    const handleBlur = (field: FieldInputProps<any>, e: React.FormEvent<HTMLInputElement>) => {
        helper.setTouched(true);

        if (!!e.currentTarget.value) {
            if (!telephoneRegExp.test(e.currentTarget.value)) {
                helper.setError("Invalid Phone Number");
            } else {
                helper.setValue(formatPhone(e.currentTarget.value));
            }
        }
    };

    return (
        <>
            <Label label={label} hideLabel={hideLabel} id={id} required={required} />
            <input
                {...field}
                className={styles.InputElement}
                type="tel"
                pattern={patternRegExp}
                placeholder="(513) 555 5555"
                style={{
                    width: fullWidth ? "100%" : "auto",
                    borderLeft: required && hideLabel ? "2px solid rgb(75,75,75)" : "",
                }}
                onBlur={(e) => handleBlur(field, e)}
            />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};

export default Telephone;
