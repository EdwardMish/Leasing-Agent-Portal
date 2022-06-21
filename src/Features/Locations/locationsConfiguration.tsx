import * as React from 'react';

import LocationsPage from './Pages/LocationsPage';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { userIsOwnerOperator } from '../../utils/Users';

const locationsConfiguration: RouteNavigationConfiguration = {
    name: 'Locations',
    navigation: {
        main: {
            text: 'Locations',
            route: {
                url: '/locations',
                pageRoot: <LocationsPage />,
            },
            isAllowed: (user: CurrentUser): boolean => userIsOwnerOperator(user),
        },
    },
    disableFeature: [],
};

export default locationsConfiguration;
