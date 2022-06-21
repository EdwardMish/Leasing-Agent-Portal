import * as React from 'react';

import { TextInput } from './TextInput';
import {
    useValidationMessagingArgs,
    ValidationStates,
} from './ValidationMessages';

interface LastNameProps {
    initialValue?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [
        ValidationStates.MissingRequired,
    ],
};

export const LastName: React.FC<LastNameProps> = ({ initialValue }) => (
    <TextInput
        formFieldId="LastName"
        isRequired
        inputValidation={verification}
        label="Last Name"
        name="LastName"
        initialValue={initialValue}
    />
);
