import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { Page } from './Pages/Page';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsTenantAndHasPermissions } from '../../utils/Users';
import { UserPermissions } from '../../Types';

const permissions: UserPermissions[] = [UserPermissions.ViewInvoices];

const isAllowed = (user: CurrentUser): boolean => userIsTenantAndHasPermissions(user, permissions);

const invoicesConfiguration: RouteNavigationConfiguration = {
    name: 'Invoices',
    navigation: {
        main: {
            text: 'Invoices',
            route: {
                url: '/invoices',
                pageRoot: <Page />,
            },
            isAllowed,
        },
    },
    disableFeature: [],
};

export default invoicesConfiguration;
