import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Business } from '../../../../API';
import { CurrentUserState, Shared, Welcome } from '../../../../State';
import { UserPermissions } from '../../../../Types';

import {
    ChevronDown, ChevronUp, Info, IconColors,
} from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import { hasPermissions } from '../../../../utils/Users';

import UserListItem from './UserListItem';

interface UserListProps {
    currentRole: Shared.Types.Role | undefined;
    occupantId: number;
    users: Welcome.Types.TenantUser[];
    showUser: (occupantUsers: Welcome.Types.TenantUser) => boolean;
}

const filterAdminusers = (users: Welcome.Types.TenantUser[], showUser): Welcome.Types.TenantUser[] => users.filter((user: Welcome.Types.TenantUser) => hasPermissions(user.permissions, [UserPermissions.AdministrateBusiness]));

const UserList: React.FC<UserListProps> = ({
    currentRole, occupantId, users, showUser,
}) => {
    const dispatch = useDispatch();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(
        CurrentUserState.selectors.currentUser,
    );

    const [adminUsers, setAdminUsers] = React.useState<Welcome.Types.TenantUser[]>(
        filterAdminusers(users, showUser),
    );
    const [showAdminUsers, toggleAdminUsers] = React.useState<boolean>(false);
    const [showInfoBlock, toggleInfoBlock] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAdminUsers(filterAdminusers(users, showUser));
    }, [users, showUser]);

    const removeUser = (userId: number) => {
        if (currentRole) {
            Business.API.removeUserRole(userId, occupantId, currentRole.id).then(() => {
                dispatch({
                    type: Welcome.Actions.REMOVE_USER_ROLE,
                    payload: {
                        occupantId,
                        userId,
                        role: currentRole,
                    },
                } as Welcome.ActionTypes);
            });
        }
    };

    const handleToggleUsers = () => {
        toggleAdminUsers(!showAdminUsers);
    };

    const handleToggleInfo = () => {
        toggleInfoBlock(!showInfoBlock);
    };

    return (
        <>
            {users
                .filter(
                    (user: Welcome.Types.TenantUser) => user.enabled
                        && !hasPermissions(user.permissions, [UserPermissions.AdministrateBusiness])
                        && user.id !== currentUser.id
                        && user.roles.some((role) => !!(role.id === currentRole?.id)),
                )
                .map(({
                    firstName, lastName, email, id,
                }) => (
                    <UserListItem
                        key={`user-list-item-${email}`}
                        name={`${firstName} ${lastName}`}
                        id={id}
                        email={email}
                        handleRemove={removeUser}
                    />
                ))}
            <FlexWrapper
                align="center"
                justify="between"
                style={{
                    margin: '1.5rem 0',
                    height: '2rem',
                    width: '100%',
                    borderBottom: `1px solid ${IconColors.LightGrey}`,
                }}
            >
                <FlexWrapper align="center" justify="start">
                    <h2
                        style={{
                            margin: '0',
                            fontSize: '0.875rem',
                            color: IconColors.DarkGrey,
                            lineHeight: '2rem',
                        }}
                    >
                        {`Admin Users (${adminUsers.length})`}
                    </h2>
                    <div style={{ margin: '0 0.5rem', cursor: 'pointer' }} onClick={handleToggleInfo}>
                        <FlexWrapper align="center" justify="center" style={{ height: '2rem' }}>
                            <Info aspect="1.25rem" color={IconColors.BrandBlue} />
                        </FlexWrapper>
                    </div>
                </FlexWrapper>
                <div style={{ cursor: 'pointer' }} onClick={handleToggleUsers}>
                    <FlexWrapper align="center" justify="between" style={{ height: '2rem' }}>
                        {showAdminUsers ? (
                            <ChevronUp aspect="1.25rem" color={IconColors.BrandBlue} />
                        ) : (
                            <ChevronDown aspect="1.25rem" color={IconColors.BrandBlue} />
                        )}
                    </FlexWrapper>
                </div>
            </FlexWrapper>
            {showInfoBlock && (
                <div
                    style={{
                        margin: '0.5rem 0',
                        padding: '1rem',
                        lineHeight: '1.4',
                        border: `1px solid ${IconColors.LightGrey}`,
                        borderRadius: '0.25rem',
                        backgroundColor: IconColors.OffWhite,
                    }}
                >
                    <p style={{ marginBottom: '0.5rem' }}>
                        <b>Business Administration</b>
                    </p>
                    <p>
                        Users with the business administration role have access to all features on DashComm.
                    </p>
                </div>
            )}
            {showAdminUsers && (
                <>
                    <UserListItem
                        key={`user-list-item-${currentUser.email}`}
                        name={`${currentUser.firstName} ${currentUser.lastName}`}
                        id={currentUser.id}
                        email={currentUser.email}
                    />
                    {adminUsers
                        .filter((user) => user.id !== currentUser.id)
                        .map(({
                            firstName, lastName, email, id,
                        }) => (
                            <UserListItem
                                key={`user-list-item-${email}`}
                                name={`${firstName} ${lastName}`}
                                id={id}
                                email={email}
                            />
                        ))}
                </>
            )}
        </>
    );
};

export default UserList;
