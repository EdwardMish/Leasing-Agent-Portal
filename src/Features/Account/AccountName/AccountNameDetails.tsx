import * as React from 'react';

interface AccountNameDetailsProps {
    firstName: string;
    lastName: string;
}

const AccountNameDetails: React.FC<AccountNameDetailsProps> = ({ firstName, lastName }): React.ReactElement => (
    <h2 style={{ margin: '0.75rem 0 1rem', lineHeight: 1 }}>{`${firstName} ${lastName}`}</h2>
);

export default AccountNameDetails;
