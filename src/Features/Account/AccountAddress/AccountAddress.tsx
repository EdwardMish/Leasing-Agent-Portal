import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersAPI from '../../../API/Users';
import { UserAddress } from '../../../API/Users/UsersTypes';

import { LoadingContent } from '../../../Shared/PageElements';

import { globalMessageActionCreators } from '../../../State';
import { currentUserId } from '../../../State/CurrentUser/selectors';

import { IconColors } from '../../../Icons';

import AccountDetailsSectionTitle from '../AccountDetailsSectionTitle';

import AccountAddressDetails from './AccountAddressDetails';
import EditAccountAddress from './EditAccountAddress';

const AccountAddress: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    const userId: number = useSelector(currentUserId);

    const [address, setAddress] = React.useState<UserAddress>();
    const [editAddress, toggleEditAddress] = React.useState<boolean>(false);

    React.useEffect(() => {
        UsersAPI.getUserAddress(userId)
            .then((userAddress: UserAddress) => {
                setAddress(userAddress);
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve contact information', err));
            });
    }, []);

    const edit = (userAddress: UserAddress) => {
        UsersAPI.updateUserAddress(userId, userAddress)
            .then(() => {
                setAddress(userAddress);

                toggleEditAddress(false);
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to update address information', err));
            });
    };

    return (
        <div
            style={{
                borderBottom: `1px solid ${IconColors.OffWhite}`,
                margin: '0 0 1rem',
            }}
        >
            <AccountDetailsSectionTitle
                title="Address"
                active={editAddress}
                toggleActive={() => toggleEditAddress(!editAddress)}
            />
            {!!address && Object.values(address).length > 0 ? (
                <>
                    {editAddress ? (
                        <EditAccountAddress address={address} edit={edit} cancel={() => toggleEditAddress(false)} />
                    ) : (
                        <AccountAddressDetails address={address} />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </div>
    );
};

export default AccountAddress;
