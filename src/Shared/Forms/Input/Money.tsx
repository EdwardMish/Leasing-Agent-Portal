import { useField } from 'formik';
import React from 'react';
import MaskedInput from 'react-text-mask';
import { Label } from 'Shared/Forms/Label';
import { createNumberMask } from 'text-mask-addons';
import { unformatNumber } from 'utils';

import styles from '../forms.module.css';

interface MoneyMaskOptions {
    prefix?: string;
    suffix?: string;
    allowDecimal?: boolean;
    decimalSymbol?: string;
    decimalLimit?: string;
    allowLeadingZeroes?: boolean;
    integerLimit?: number;
}

const defaultMoneyMaskOptions = {
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
};

interface MoneyProps {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    hideLabel?: boolean;
    fullWidth?: boolean;
    required?: boolean;
    maskOptions?: MoneyMaskOptions;
    onChange?: (value: any) => void;
}

const Money = ({
    id,
    name,
    label,
    required = false,
    fullWidth = false,
    hideLabel = false,
    maskOptions,
    onChange,
    ...props
}: MoneyProps): React.ReactElement => {
    const [field, meta] = useField({ name });

    const moneyMask = createNumberMask({
        ...defaultMoneyMaskOptions,
        ...maskOptions,
    });

    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const cleanValue = unformatNumber(e.currentTarget.value);
        if (onChange) onChange(cleanValue); // User own onChange Method

        field.onChange(e); // Formik onChange method
    };

    return (
        <>
            <Label label={label} hideLabel={hideLabel} id={id} required={required} />
            <MaskedInput
                {...field}
                className={styles.InputElement}
                id={id}
                name={name}
                value={field.value}
                required={required}
                mask={moneyMask}
                inputMode="decimal"
                onChange={onChangeHandler}
                style={{
                    width: fullWidth ? '100%' : 'auto',
                    borderLeft: required && hideLabel ? '2px solid rgb(75,75,75)' : '',
                }}
            />
            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </>
    );
};

export default Money;
