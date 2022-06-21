import * as React from "react";
import { useField } from "formik";

import { Label } from "../Label";

const styles = require("../forms.module.css");

interface PasswordProps {
    label: string;
    id: string;
    name: string;
    required?: boolean;
}

export const Password: React.FC<PasswordProps> = ({ id, label, required = false, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <>
            <Label label={label} id={id} required={required} />
            <input className={styles.InputElement} type="password" {...field} />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};
