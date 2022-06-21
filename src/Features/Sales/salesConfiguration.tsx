import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { Page } from './Pages/Page';
import { Role } from '../../State/Shared/Types';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsOwnerOperatorAndHasRoles, userIsTenantAndHasPermissions } from '../../utils/Users';
import { UserPermissions, UserRoles, UserRolesDisplayName } from '../../Types';

const roles: Role[] = [
    { id: UserRoles.OOAdmin, name: UserRolesDisplayName[UserRoles.OOAdmin] },
    { id: UserRoles.OOSalesCoordinator, name: UserRolesDisplayName[UserRoles.OOSalesCoordinator] },
];

const permissions: UserPermissions[] = [UserPermissions.ViewSales, UserPermissions.SubmitSales];

const isAllowed = (user: CurrentUser): boolean =>
    userIsOwnerOperatorAndHasRoles(user, roles) || userIsTenantAndHasPermissions(user, permissions);

const salesConfiguration: RouteNavigationConfiguration = {
    name: 'Sales',
    navigation: {
        main: {
            text: 'Sales',
            route: {
                url: '/sales',
                pageRoot: <Page />,
            },
            isAllowed,
        },
    },
    disableFeature: [],
};

export default salesConfiguration;
