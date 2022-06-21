import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { DirectoryPage } from './Pages';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsTenant } from '../../utils/Users';

const directoryConfiguration: RouteNavigationConfiguration = {
    name: 'Directory',
    navigation: {
        main: {
            text: 'Directory',
            route: {
                url: '/directory',
                pageRoot: <DirectoryPage />,
            },
            isAllowed: (user: CurrentUser): boolean => userIsTenant(user),
        },
    },
    disableFeature: [],
};

export default directoryConfiguration;
