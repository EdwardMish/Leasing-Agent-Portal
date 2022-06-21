import * as React from 'react';

import { TextInput } from './TextInput';
import {
    useValidationMessagingArgs,
    ValidationStates,
} from './ValidationMessages';

interface EmailProps {
    initialValue?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [
        ValidationStates.MissingRequired,
    ],
};

export const Email: React.FC<EmailProps> = ({ initialValue }) => (
    <TextInput
        formFieldId="email"
        isRequired
        inputValidation={verification}
        label="Email Address"
        name="Email"
        initialValue={initialValue}
    />
);
