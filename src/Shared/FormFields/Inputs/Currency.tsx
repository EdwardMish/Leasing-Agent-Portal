import * as React from 'react';

import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';

const formStyles = require('../form-fields.module.css');

interface CurrencyMaskOptions {
    prefix: string;
    suffix: string;
    allowDecimal: boolean;
    decimalSymbol: string;
    decimalLimit: string;
    allowLeadingZeroes: boolean;
    integerLimit: number;
}

interface InputCurrencyProps {
    id: string;
    name: string;
    value: string;
    handler: (e: React.FormEvent<HTMLInputElement>) => void;
    required?: boolean;
    formRow?: boolean;

    maskOptions?: CurrencyMaskOptions;
}

const defaultMaskOptions = {
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

export const Currency: React.FC<InputCurrencyProps> = ({
    id,
    name,
    value,
    handler,
    formRow,
    maskOptions,
    required = false,
}) => {
    const currencyMask = createNumberMask({
        ...defaultMaskOptions,
        ...maskOptions,
    });

    return (
        <>
            <label className={formStyles.InputElementLabel} htmlFor={id}>{`${name} ${required ? '(required)' : ''}`}</label>
            <MaskedInput
                className={`${formStyles.InputElement} ${formRow ? formStyles.FormRow : ''}`}
                id={id}
                name={name}
                value={value}
                required={required}
                mask={currencyMask}
                inputMode="decimal"
                onChange={handler}
            />
        </>
    );
};
