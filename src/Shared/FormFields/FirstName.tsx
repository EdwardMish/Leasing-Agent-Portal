import * as React from 'react';

import { TextInput } from './TextInput';
import {
    useValidationMessagingArgs,
    ValidationStates,
} from './ValidationMessages';

interface FirstNameProps {
    initialValue?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [
        ValidationStates.MissingRequired,
    ],
};

export const FirstName: React.FC<FirstNameProps> = ({ initialValue }) => (
    <TextInput
        formFieldId="FirstName"
        isRequired
        inputValidation={verification}
        label="First Name"
        name="FirstName"
        initialValue={initialValue}
    />
);
