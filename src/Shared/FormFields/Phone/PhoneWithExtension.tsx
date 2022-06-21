import * as React from 'react';

import { Phone } from './Phone';

import { TextInput } from '../TextInput';
import { useValidationMessagingArgs } from '../ValidationMessages';

interface PhoneExtProps {
    initialPhone?: string;
    initialPhoneExt?: string;
}

const verification: useValidationMessagingArgs = {
    applicableStates: [],
};

const phoneStyles = require('./phone.module.css');

export const PhoneWithExtension: React.FC<PhoneExtProps> = ({ initialPhone, initialPhoneExt = '' }) => (
    <div className={phoneStyles.Wrapper}>
        <div className={phoneStyles.Phone}>
            <Phone initialValue={initialPhone} />
        </div>
        <div className={phoneStyles.Extension}>
            <TextInput
                formFieldId="phone-extension"
                inputValidation={verification}
                label="Ext"
                name="PhoneExt"
                initialValue={initialPhoneExt || ''}
            />
        </div>
    </div>
);
