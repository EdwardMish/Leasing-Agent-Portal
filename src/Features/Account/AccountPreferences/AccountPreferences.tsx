import * as React from 'react';

import { EmailTypes } from '../../../State/Shared/Types/EmailTypes';

import { IconColors } from '../../../Icons';

import EmailPreferenceCheckbox from './EmailPreferenceCheckbox';

const AccountPreferences: React.FC = (): React.ReactElement => (
    <div
        style={{
            margin: '0 0 1rem',
            paddingBottom: '0.75rem',
            borderBottom: `1px solid ${IconColors.OffWhite}`,
        }}
    >
        <h2
            style={{
                fontSize: '0.8rem',
                margin: '0 0 0.75rem',
                fontWeight: 400,
                color: IconColors.LightGrey,
            }}
        >
            Check which types of email you would like to receive
        </h2>
        <EmailPreferenceCheckbox emailType={EmailTypes.Normal} />
        <EmailPreferenceCheckbox emailType={EmailTypes.News} />
        <EmailPreferenceCheckbox emailType={EmailTypes.Requests} />
        <EmailPreferenceCheckbox emailType={EmailTypes.SalesSubmittal} />
    </div>
);

export default AccountPreferences;
