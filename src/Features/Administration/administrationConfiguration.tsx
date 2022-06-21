import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { Role } from '../../State/Shared/Types';

import { UserRoles, UserRolesDisplayName } from '../../Types';

import { userIsOwnerOperatorAndHasRoles } from '../../utils/Users';

import { UsersPage } from '../Users/Pages/UsersPage';

const roles: Role[] = [
    {
        id: UserRoles.OOAdmin,
        name: UserRolesDisplayName[UserRoles.OOAdmin],
    },
];

const isAllowed = (user: CurrentUser): boolean => userIsOwnerOperatorAndHasRoles(user, roles);

const administrationConfiguration: RouteNavigationConfiguration = {
    name: 'Administration',
    navigation: {
        main: {
            text: 'Users',
            route: {
                url: '/users',
                pageRoot: <UsersPage />,
            },
            isAllowed,
        },
    },
    disableFeature: [],
};

export default administrationConfiguration;
