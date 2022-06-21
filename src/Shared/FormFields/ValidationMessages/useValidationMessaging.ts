import * as React from 'react';
import axios from 'axios';

import { ValidationStates } from './ValidationStates';

type ValidationMessagingHook = (args: useValidationMessagingArgs) => [ValidationStates, (e: React.FormEvent<HTMLInputElement>) => void]

export interface useValidationMessagingArgs {
    applicableStates: ValidationStates[];
}

const verifyRequired = (applicableStates: ValidationStates[]): boolean => applicableStates.includes(ValidationStates.MissingRequired);
const verifyEmailExists = (applicableStates: ValidationStates[]): boolean => applicableStates.includes(ValidationStates.EmailExists);

export const useValidationMessaging: ValidationMessagingHook = ({ applicableStates }) => {
    const [validationState, setValidationState] = React.useState<ValidationStates>(ValidationStates.Valid);

    const validationHandler = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.target as HTMLInputElement;

        if (applicableStates.length <= 0) {
            return;
        }

        if (verifyRequired(applicableStates) && value.length <= 0) {
            setValidationState(ValidationStates.MissingRequired);

            return;
        }

        if (verifyEmailExists(applicableStates)) {
            const tokenElement: HTMLInputElement | null = document.querySelector('#create-user-form > input[name=__RequestVerificationToken]');
            const __RequestVerificationToken: string = tokenElement && tokenElement.value || '';

            const serializeUserEmailParams = (data): string => {
                const serializedData: string[] = [];

                for (const k in data) {
                    if (data[k]) {
                        serializedData.push(`${k}=${encodeURIComponent(data[k])}`);
                    }
                }

                return serializedData.join('&');
            };

            axios.post(`${ROOT}/Users/FindUserByEmail`, serializeUserEmailParams({
                __RequestVerificationToken,
                emailAddress: value,
            }))
                .then(() => {
                    setValidationState(ValidationStates.EmailExists);
                });
        }

        setValidationState(ValidationStates.Valid);
    };

    return [
        validationState,
        validationHandler,
    ];
};
