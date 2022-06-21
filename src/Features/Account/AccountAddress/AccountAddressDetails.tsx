import * as React from 'react';

import { UserAddress } from '../../../API/Users/UsersTypes';

import { NoContent } from '../../../Shared/PageElements';

import { formatCityAndState } from '../../../utils';

interface AccountAddressDetailsProps {
    address: UserAddress;
}

const addressLine: React.CSSProperties = {
    margin: 0,
    lineHeight: '1.75rem',
};

const AccountAddressDetails: React.FC<AccountAddressDetailsProps> = ({ address }): React.ReactElement => (
    <div
        style={{
            margin: '0.75rem 0 1rem',
        }}
    >
        {Object.values(address).filter((val: string) => !!val.length).length ? (
            <>
                {address.street && <p style={addressLine}>{address.street}</p>}
                {address.street2 && <p style={addressLine}>{address.street2}</p>}
                <p style={addressLine}>{formatCityAndState(address)}</p>
                {address.zipcode && <p style={addressLine}>{address.zipcode}</p>}
            </>
        ) : (
            <NoContent message="No saved address" />
        )}
    </div>
);

export default AccountAddressDetails;
