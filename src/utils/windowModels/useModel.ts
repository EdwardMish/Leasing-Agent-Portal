import * as React from 'react';

interface ModelState {
    Errors: any[];
    Value: {
        AttemptedValue: string;
        Culture: string;
        RawValue: string[];
    }
}

interface ModelWindow extends Window {
    model: {};
    modelState: {
        [key: string]: ModelState;
    };
}

declare const window: ModelWindow;

type ModelHook = (keys: string[]) => [
    { [key: string]: any; }
]

export const useModel: ModelHook = (keys: string[]) => {
    const [values, setValues] = React.useState<object>({});

    React.useEffect(() => {
        const model = window.model || {};
        const modelState = window.modelState || {};

        const valuesFromModel = keys.reduce((agg: { [key: string]: any }, key: string) => {
            const currentValue = model[key] || modelState[key]?.Value?.AttemptedValue || undefined;

            return currentValue
                ? { ...agg, [key]: currentValue }
                : agg;
        }, {});

        setValues(valuesFromModel);
    }, [keys.join('-')]);

    return [
        values,
    ];
};
