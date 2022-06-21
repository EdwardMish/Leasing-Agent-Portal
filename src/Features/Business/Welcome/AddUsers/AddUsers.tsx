import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { ApplicationFeatures } from '../../../ApplicationFeatures';

import { UserRolesAPI, Business } from '../../../../API';
import { Shared, Welcome } from '../../../../State';

import { Add, IconColors } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import { LoadingContent, NoContent } from '../../../../Shared/PageElements';

import { roleNameByFeature, TenantRoleNames } from '../TenantRoleNames';

import UserListItemToggle from './UserListItemToggle';
import WelcomeButtonLink from '../WelcomeButtonLink';

import styles = require('../welcome.module.css');

export const AddUsers: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { firstOccupantToSetup } = Welcome.Hooks.useOccupantsFromWelcomeState();

    const { occupantUsers } = Welcome.Hooks.useUsersForOccupantFromWelcomeState(firstOccupantToSetup.id);

    const [selectedUserIds, setSelectedUserIds] = React.useState<number[]>([]);

    const { feature } = useParams<{ feature: string }>();

    const [tenantRoles, setTenantRoles] = React.useState<Shared.Types.Role[]>([]);
    const [currentRole, setCurrentRole] = React.useState<Shared.Types.Role | undefined>();

    React.useEffect(() => {
        UserRolesAPI.getTenantRoles()
            .then((roles) => {
                setTenantRoles(roles);
            })
            .catch(() => {});
    }, []);

    React.useEffect(() => {
        if (tenantRoles.length) {
            const roleName = roleNameByFeature(feature as ApplicationFeatures);
            const role = tenantRoles.find((tenantRole) => tenantRole.name === roleName);

            if (role) setCurrentRole(role);
        }
    }, [feature, tenantRoles]);

    const handleUserSelection = (userId: number) => {
        const index = selectedUserIds.findIndex((id) => id === userId);

        index > -1
            ? setSelectedUserIds([...selectedUserIds.slice(0, index), ...selectedUserIds.slice(index + 1)])
            : setSelectedUserIds([...selectedUserIds, userId]);
    };

    const handleUserAddition = () => {
        if (currentRole) {
            Promise.allSettled(
                selectedUserIds.map((userId) => Business.API.addUserRole(userId, firstOccupantToSetup.id, currentRole.id).then(() => {
                    dispatch({
                        type: Welcome.Actions.ADD_USER_ROLE,
                        payload: {
                            occupantId: firstOccupantToSetup.id,
                            userId,
                            role: currentRole,
                        },
                    } as Welcome.ActionTypes);
                })),
            ).then(() => {
                history.push(`/app/welcome/users/${feature}`);
            });
        }
    };

    const formatAddText = (): string => (!selectedUserIds.length
        ? 'No Users Selected'
        : selectedUserIds.length > 1
            ? `Add ${selectedUserIds.length} Users`
            : 'Add 1 User');

    return (
        <>
            {currentRole ? (
                <>
                    <h1>Add Users</h1>
                    {occupantUsers.length ? (
                        <>
                            {occupantUsers
                                .filter((user) => user.roles.every(
                                    (role) => !!(role.id !== currentRole?.id)
                                            && role.name !== TenantRoleNames.Admin,
                                ))
                                .map((user: Welcome.Types.TenantUser) => (
                                    <UserListItemToggle
                                        key={`toggle-user-list-${user.email}`}
                                        selectedUsers={selectedUserIds}
                                        user={{
                                            name: `${user.firstName} ${user.lastName}`,
                                            email: user.email,
                                            id: user.id,
                                        }}
                                        handler={handleUserSelection}
                                    />
                                ))}
                        </>
                    ) : (
                        <NoContent message="No Users Found" />
                    )}
                    <Link to={`/app/welcome/users/${feature}/create-user`} className={styles.AddOrCreateUser}>
                        <p>Create a User</p>
                        <Add color={IconColors.BrandBlue} aspect="1.5rem" />
                    </Link>
                    <Button
                        callback={handleUserAddition}
                        disable={!(selectedUserIds.length > 0)}
                        text={formatAddText()}
                        fullWidth
                        withMarginTop
                    />
                    <WelcomeButtonLink display="Cancel" link={`/app/welcome/users/${feature}`} inverse />
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
