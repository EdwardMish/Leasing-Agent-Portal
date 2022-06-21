import * as React from 'react';

import { TextInput } from '../TextInput';
import {
    useValidationMessagingArgs,
    ValidationStates,
} from '../ValidationMessages';

interface PhoneProps {
    initialValue?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [
        ValidationStates.MissingRequired,
    ],
};

export const Phone: React.FC<PhoneProps> = ({ initialValue }) => (
    <TextInput
        formFieldId="phone"
        isRequired
        inputValidation={verification}
        label="Phone Number"
        name="Phone"
        initialValue={initialValue}
    />
);
