import * as React from 'react';

import { UserRolesAPI } from '../../../../API';

import { Shared, Welcome } from '../../../../State';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import { ApplicationFeatures } from '../../../ApplicationFeatures';

import { TenantRoleNames } from '../TenantRoleNames';

import AddOrCreateUserButton from './AddOrCreateUserButton';
import UserList from './UserList';
import WelcomeButtonLink from '../WelcomeButtonLink';

export interface UsersPageProps {
    feature: ApplicationFeatures;
    header: string;
    title: string;
    nextRoute: string;
    roleName: TenantRoleNames;
    showUser: (occupantUsers: Welcome.Types.TenantUser) => boolean;
    Snippet: React.ReactElement;
    createOnly?: boolean;
}

import styles = require('../welcome.module.css');

type WelcomeUsersHook = {
    usersLoadedForOccupant: boolean;
    occupantUsers: Welcome.Types.TenantUser[];
};

const ManageUsers: React.FC<UsersPageProps> = ({
    feature,
    header,
    title,
    nextRoute,
    roleName,
    showUser,
    createOnly = false,
    Snippet,
}) => {
    const { firstOccupantToSetup = { id: 0 } } = Welcome.Hooks.useOccupantsFromWelcomeState();

    const { occupantUsers = [] }: WelcomeUsersHook = Welcome.Hooks.useUsersForOccupantFromWelcomeState(
        firstOccupantToSetup.id,
    );

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
            const role = tenantRoles.find((tenantRole) => tenantRole.name === roleName);

            if (role) setCurrentRole(role);
        }
    }, [roleName, tenantRoles]);

    return (
        <>
            <h1>User Management</h1>
            <p className={styles.WelcomeParagraphBlock}>{Snippet}</p>
            <FlexWrapper align='start' justify='between'>
                <h2>{header}</h2>
            </FlexWrapper>
            <p className={styles.WelcomeParagraphBlock}>
                <b>{title}</b>
            </p>
            <UserList
                currentRole={currentRole}
                occupantId={firstOccupantToSetup.id}
                showUser={showUser}
                users={occupantUsers}
            />
            <AddOrCreateUserButton baseRoute={`${feature}`} createOnly={createOnly} />
            <WelcomeButtonLink link={`${nextRoute}`} display='Continue' />
            <WelcomeButtonLink link={`${nextRoute}`} display='Set Later' inverse />
        </>
    );
};

export default ManageUsers;
