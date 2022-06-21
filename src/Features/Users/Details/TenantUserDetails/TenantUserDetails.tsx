import * as React from 'react';

import { User } from '../../../../Types';
import { Users } from '../../../../API';

import { IconColors } from '../../../../Icons';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { UserCore } from '../../../../Shared/Users';
import { TabStates } from '../../../../Shared/TabStates';

import { NotificationPreferences } from '../../NotificationPreferences';
import { TenantSelection } from '../../TenantSelection';
import { RolesTable } from './RolesTable';

type UserWithPermissions = Users.Types.User

interface TenantUserDetailsProps {
    user: User;
    userWithPermissions: UserWithPermissions;
    refreshUser: () => void;
}

export const TenantUserDetails: React.FC<TenantUserDetailsProps> = ({
    refreshUser,
    user,
    userWithPermissions,
}) => {
    const [viewState, setViewState] = React.useState<0 | 1>(0);

    const tabs = [
        {
            name: 'Roles',
            callBack: () => setViewState(0),
        },
        {
            name: 'Associations',
            callBack: () => setViewState(1),
        },
    ];

    return (
        <>
            <UserCore user={user} />
            <NotificationPreferences userId={user.id} prefills={user.notificationTypes} />
            <TabStates tabs={tabs} />
            <div style={{ marginBottom: '2rem' }}>
                {
                    viewState === 0
                        ? <RolesTable user={userWithPermissions} />
                        : (
                            <FlexWrapper align="start" justify="between">
                                {
                                    !!(userWithPermissions?.tenant?.occupants)
                                && (
                                    <div style={{ width: '20rem' }}>
                                        {userWithPermissions.tenant.occupants.map((occupant) => (
                                            <div
                                                key={`occupant-association-${occupant.occupantId}`}
                                                style={{ width: '100%', padding: '0.75rem 0', borderBottom: `1px solid ${IconColors.LightGrey}` }}
                                            >
                                                <p style={{ margin: '0', lineHeight: '1.25rem' }}><b>{occupant.name}</b></p>
                                                <p style={{ margin: '0', lineHeight: '1.25rem' }}>{`@ ${occupant.propertyName}`}</p>
                                            </div>
                                        ))}
                                    </div>
                                )
                                }
                                <div style={{ width: 'calc(100% - 21rem)' }}>
                                    <TenantSelection userId={user.id} callback={refreshUser} />
                                </div>
                            </FlexWrapper>
                        )
                }
            </div>
        </>
    );
};
