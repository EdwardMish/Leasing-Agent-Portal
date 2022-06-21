import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

import { CurrentUser } from '../../State/CurrentUser/Types';

import { userIsTenant } from '../../utils/Users';

import { BusinessPage } from './Pages/BusinessPage';
import Welcome from './Welcome/Welcome';

const businessConfiguration: RouteNavigationConfiguration = {
    name: 'Business',
    application: {
        url: '/app/welcome',
        PageRoot: <Welcome />,
        isAllowed: (user: CurrentUser): boolean => userIsTenant(user),
    },
    navigation: {
        main: {
            text: 'Business',
            route: {
                url: '/business',
                pageRoot: <BusinessPage />,
            },
            isAllowed: (user: CurrentUser): boolean => userIsTenant(user),
        },
    },
    disableFeature: [],
};

export default businessConfiguration;
