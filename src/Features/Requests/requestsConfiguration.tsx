import * as React from 'react';

import { RequestsPage } from './Pages/RequestsPage';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

const requestsConfiguration: RouteNavigationConfiguration = {
    name: 'Requests',
    navigation: {
        main: {
            text: 'Requests',
            route: {
                url: '/requests',
                pageRoot: <RequestsPage />,
            },
            isAllowed: () => true,
        },
    },
    disableFeature: [],
};

export default requestsConfiguration;
