import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { ReportsPage } from './Pages/ReportsPage';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsOwnerOperator } from '../../utils/Users';

const reportsConfiguration: RouteNavigationConfiguration = {
    name: 'Reports',

    navigation: {
        main: {
            text: 'Reports',
            route: {
                url: '/reports',
                pageRoot: <ReportsPage />,
            },
            isAllowed: (user: CurrentUser): boolean => userIsOwnerOperator(user),
        },
    },
    disableFeature: [],
};

export default reportsConfiguration;
