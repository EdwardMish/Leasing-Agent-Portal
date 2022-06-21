import * as React from 'react';

type ControlledFormHook = (initialValue?: string) => [
    string,
    (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLSelectElement>) => void,
    (forcedValue: string) => void,
    boolean
]

export const useControlledForm: ControlledFormHook = (initialValue: string = '') => {
    const [inputValue, updateValue] = React.useState<string>(initialValue);
    const [dirtyForm, setDirty] = React.useState<boolean>(false);

    const handler = (e: React.FormEvent<HTMLInputElement>): void => {
        if (!dirtyForm) setDirty(true);

        const { value } = e.target as HTMLInputElement;

        updateValue(value);
    };

    const forceUpdate = (forcedValue: string) => {
        updateValue(forcedValue);
    };

    return [
        inputValue,
        handler,
        forceUpdate,
        dirtyForm,
    ];
};
