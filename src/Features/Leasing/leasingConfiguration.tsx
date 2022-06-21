import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

import { CurrentUser } from '../../State/CurrentUser/Types/CurrentUser';
import { Role } from '../../State/Shared/Types';

import { UserRoles } from '../../Types';

import { userIsOwnerOperatorAndHasRoles, userIsTenant } from '../../utils/Users';

import LeftHeaderComponent from './Application/LeftHeaderComponent';
import ApplicationPage from './Application/Pages/Page';
import MainPage from './Main/Pages/Page';

const leasingConfiguration: RouteNavigationConfiguration = {
    name: 'Lease Application',
    application: {
        url: '/app/lease-application',
        PageRoot: <ApplicationPage />,
        LeftHeaderComponent: <LeftHeaderComponent />,
        isAllowed: (user: CurrentUser) => userIsTenant(user) && process.env.NODE_ENV === 'development',
    },
    navigation: {
        main: {
            text: 'Leasing',
            route: {
                url: '/leasing',
                pageRoot: <MainPage />,
            },
            isAllowed: (user: CurrentUser) =>
                process.env.NODE_ENV === 'development' &&
                userIsOwnerOperatorAndHasRoles(user, [{ id: UserRoles.OOLeasingAgent } as Role]),
        },
    },
    disableFeature: [],
};

export default leasingConfiguration;
