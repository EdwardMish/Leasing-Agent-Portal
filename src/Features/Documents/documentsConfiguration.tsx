import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { Page } from './Pages/Page';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsTenantAndHasPermissions } from '../../utils/Users';
import { UserPermissions } from '../../Types';

const permissions: UserPermissions[] = [UserPermissions.ViewDocuments];

const isAllowed = (user: CurrentUser): boolean => userIsTenantAndHasPermissions(user, permissions);

const documentsConfiguration: RouteNavigationConfiguration = {
    name: 'Documents',
    navigation: {
        main: {
            text: 'Documents',
            route: {
                url: '/documents',
                pageRoot: <Page />,
            },
            isAllowed,
        },
    },
    disableFeature: [],
};

export default documentsConfiguration;
