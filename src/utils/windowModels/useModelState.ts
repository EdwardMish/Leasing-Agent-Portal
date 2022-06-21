import * as React from 'react';

interface ModelState {
    Errors: any[];
    Value: {
        AttemptedValue: string;
        Culture: string;
        RawValue: string[];
    }
}

interface ModelStateWindow extends Window {
    modelState: {
        [key: string]: ModelState
    };
}

declare const window: ModelStateWindow;

type ModelStateHook = (keys: string[]) => [
    { [key: string]: any; }
]

export const useModelState: ModelStateHook = (keys: string[]) => {
    const [values, setValues] = React.useState<object>({});

    React.useEffect(() => {
        const modelState = window.modelState || {};

        const valuesFromModelState = keys.reduce((agg: { [key: string]: any }, key: string) => {
            const currentValue: ModelState = modelState[key];

            return currentValue
                ? { ...agg, [key]: currentValue.Value?.RawValue }
                : agg;
        }, {});

        setValues(valuesFromModelState);
    }, [keys.join('-')]);

    return [
        values,
    ];
};
