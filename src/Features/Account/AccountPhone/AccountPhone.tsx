import * as React from 'react';
import { useSelector } from 'react-redux';

import { Phone } from '../../../Types/User';

import UserAPI from '../../../API/Users';

import { currentUserId } from '../../../State/CurrentUser/selectors';

import { IconColors } from '../../../Icons';

import AccountDetailsSectionTitle from '../AccountDetailsSectionTitle';

import EditPhoneList from './EditPhoneList';
import EmergencyAlertsCallout from './EmergencyAlertsCallout';
import PhoneList from './PhoneList';

const AccountPhone: React.FC = (): React.ReactElement => {
    const userId: number = useSelector(currentUserId);

    const [editPhone, toggleEditPhone] = React.useState<boolean>(false);
    const [phones, setPhones] = React.useState<Phone[]>([]);

    const getPhones = async () => {
        const userPhones = await UserAPI.getUserPhones(userId);

        if (userPhones) setPhones(userPhones as Phone[]);
    };

    React.useEffect(() => {
        getPhones();
    }, []);

    const refresh = () => {
        getPhones();

        toggleEditPhone(false);
    };

    return (
        <>
            <div
                style={{
                    borderBottom: `1px solid ${IconColors.OffWhite}`,
                    margin: '0 0 1rem',
                }}
            >
                <AccountDetailsSectionTitle
                    title="Phone"
                    active={editPhone}
                    toggleActive={() => toggleEditPhone(!editPhone)}
                />
                <>
                    {editPhone ? (
                        <EditPhoneList phoneNumbers={phones} cancel={() => toggleEditPhone(false)} refresh={refresh} />
                    ) : (
                        <PhoneList phoneNumbers={phones} />
                    )}
                </>
            </div>
            <div
                style={{
                    borderBottom: `1px solid ${IconColors.OffWhite}`,
                    margin: '0 0 1rem',
                }}
            >
                <EmergencyAlertsCallout phoneNumbers={phones} refresh={refresh} />
            </div>
        </>
    );
};

export default AccountPhone;
