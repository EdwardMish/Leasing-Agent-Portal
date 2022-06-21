import * as React from 'react';

import { TextInput } from './TextInput';
import {
    useValidationMessagingArgs,
    ValidationStates,
} from './ValidationMessages';

interface NameProps {
    initialValue?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [
        ValidationStates.MissingRequired,
    ],
};

export const Name: React.FC<NameProps> = ({ initialValue }) => (
    <TextInput
        formFieldId="name"
        isRequired
        inputValidation={verification}
        label="Name"
        name="Name"
        initialValue={initialValue}
    />
);
