import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types/CurrentUser';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

import { userIsOwnerOperator } from '../../utils/Users';

import CommunicationsPage from './Pages/CommunicationsPage';

const communicationsConfiguration: RouteNavigationConfiguration = {
    name: 'Communications',
    navigation: {
        main: {
            text: 'Communications',
            route: {
                url: '/communications',
                pageRoot: <CommunicationsPage />,
            },
            isAllowed: (currentUser: CurrentUser) => userIsOwnerOperator(currentUser),
        },
    },
    disableFeature: [],
};

export default communicationsConfiguration;
