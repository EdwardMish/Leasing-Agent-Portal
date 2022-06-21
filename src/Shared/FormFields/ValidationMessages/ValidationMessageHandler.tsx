import * as React from 'react';

import { ValidationStates } from './ValidationStates';
import { InvalidFormat } from './InvalidFormat';
import { RequiredField } from './RequiredField';
import { EmailExists } from './EmailExists';

interface ValidationMessageHandlerProps {
    currentState: ValidationStates;
    message?: string;
}

export const ValidationMessageHandler: React.FC<ValidationMessageHandlerProps> = ({ currentState, message = undefined }) => {
    switch (currentState) {
    case ValidationStates.InvalidFormat:
        return <InvalidFormat message={message} />;
    case ValidationStates.MissingRequired:
        return <RequiredField message={message} />;
    case ValidationStates.EmailExists:
        return <EmailExists message={message} />;
    case ValidationStates.Valid:
    default:
        return null;
    }
};
